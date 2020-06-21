const { Ops } = require('../dbObjects');

const { troopCountEmbed } = require('../op/embedTroopCount');
const { isTroopName, getTroopByName } = require('../troopmathic/troopmathic.js')
const { idToUsername } = require('../etc/discordutil');
const { emojis } = require('../etc/style');

// Creates a new operation
module.exports = {
    name: 'addtroops',
    aliases: ['troopadd', 'addtroop'],
    description: 'Add troops to an op.',
    args: true,
    cooldown: 5,
    async execute(message, args) {

        // Check amount of arguments
        if (args.length == 0 || args.length > 2 || isNaN(args[0])) {
            message.channel.reply('Only 1 argument should be provided');
            return;
        }
        const OPID = args[0];
        
        message.channel.send('Enter one or more troop amounts: (400 sling)')
            .then(m => troopInsert(OPID, message.author.id, m))
            .catch(console.log);
    },
};

// Regex for finding words like "40 sling", or "20 hoplite"
// ((\d+) (\b[^\d\W]+\b))
const regex400Sling = /(\b\d+\b)[ ]+(\b[^\d\W]+\b)/;

async function troopInsert(OPID, userId, message) {
    // idResolver
    const filter = m => {
        if (m.author.bot || m.author.id != userId) {
            return false;
        }
        const matches = m.content.match(regex400Sling);
        if (matches && matches.length > 2) {
            return !isNaN(matches[1]) || isTroopName(matches[2]);
        }
        if (m.content === 'stop') {
            return true;
        }
        return false;
    };

    const troopCollector = message.channel.createMessageCollector(filter, { time: 60000 });

    // Method on collection
    troopCollector.on('collect', m => {
        if (m.author.bot || m.author.id != userId) {
            return;
        }

        if (m.content.includes('stop')) {
            troopCollector.stop();
            return;
        }

        const matches = m.content.match(regex400Sling);
        if (matches && matches.length > 2 && !isNaN(matches[1]) && isTroopName(matches[2])) {
            m.react(emojis.accept);
        }        
    });

    troopCollector.on('end', async collected => {
        const troops = [];
        for (const c of collected.array()) {
            if (c.author.bot || c.author.id != userId) {
                continue;
            }
            const matches = c.content.match(regex400Sling);
            if (matches && matches.length > 2 && !isNaN(matches[1]) && isTroopName(matches[2])) {
                const troop = getTroopByName(matches[2]);
                const amount = matches[1];
                const index = troops.findIndex((element) => element.unit.name === troop.name);
                if (index >= 0) {
                    troops[index].amount += amount;
                } 
                else {
                    troops.push({ unit: troop, amount: amount });
                }
            }
        }

        if (!troops) {
            message.reply('No units were registered.');
            return;
        }

        const op = await Ops.findOne({ where: { op_id: OPID } });
        await Promise.all(troops.map(t => op.setTroops(message.author.id, t.unit.name, t.amount)));

        // CREATE THE EMBEDTROOPCOUNT HERE
        const troopIndex = await op.getIndexByPlayer(message.author.id);
        const embed = await troopCountEmbed(op, message.author.id, troopIndex, (id) => idToUsername(message.client, id));
        message.reply({ embed: embed });
    });
}