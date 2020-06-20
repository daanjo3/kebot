const { Ops } = require('../dbObjects');
const newOpEmbed = require('../op/embed_new_op');
const Discord = require('discord.js');
const { isTroopName, getTroopByName } = require('../troopmathic/troopmathic.js')
const { emojis } = require("../style/style");

// Creates a new operation
module.exports = {
    name: 'test-troopinsert',
    aliases: ['tti'],
    description: 'Test method for inserting troops',
    args: false,
    cooldown: 5,
    async execute(message, args) {
        
        message.channel.send('Enter one or more troop amounts: (400 sling)')
            .then(troopInsert)
            .catch(console.log)
    },
};

// Regex for finding words like "40 sling", or "20 hoplite"
// ((\d+) (\b[^\d\W]+\b))
const regex400Sling = /(\b\d+\b) (\b[^\d\W]+\b)/;

function troopInsert(message) {
    // 
    const filter = m => {
        if (!m.author.bot) {
            return !m.author.bot;
        }
        const matches = m.content.matches(regex400Sling);
        if (matches && matches.length > 3) {
            return isNaN(matches[1]) || !isTroopName(matches[2]);
        }
        if (m.content === 'stop') {
            return true;
        }
        return false;
    }

    const troopCollector = message.channel.createMessageCollector(filter, { time: 60000 });

    // Method on collection
    troopCollector.on('collect', m => {

        if (m.content.includes('stop')) {
            troopCollector.stop();
            return;
        }

        const matches = m.content.matches(regex400Sling);

        let troop = getTroopByName(matches[2]);
        let amount = matches[1];
        console.log(`number: ${matches[1]}\nunit: ${troop}`);
        m.react(emojis.accept)
    });

    troopCollector.on('end', collected => {
        for (const c of collected.array()) {
            console.log(Object.keys(c))
            // message.channel.send(c)
        }
    });
}