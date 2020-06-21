const { Ops, TroopIndex } = require('../dbObjects');
const Discord = require('discord.js');

const { emojis } = require('../etc/style');
const { filterQuotes } = require('../etc/argutil');

// Creates a new operation
module.exports = {
    name: 'addop',
    aliases: ['opadd'],
    description: 'Start a new operation',
    args: true,
    cooldown: 5,
    usage: 'city name',
    async execute(message, args) {
        // Check amount of arguments
        if (args.length != 1) {
            message.channel.reply('Only 1 argument should be provided');
            return;
        }
        console.log(args);
        const city = filterQuotes(args[0]);
        // Create the op
        const op = await Ops.create({ 
            city: city,
            status: 'Planning',
            organiser: message.author.id,
        });
        // Since SQLite doesn't provide the generate primary id, reload the op
        const fullOp = await Ops.findOne({ where: { city: op.city } });
        
        // Return the result
        console.log(`${op.organiser} started an OP targeting ${op.city}`);
        message.channel.send({ embed: loadEmbed(fullOp) })
            .then(m => {
                m.react(emojis.accept);
                pendingAcceptOP(m, fullOp);
            })
            .catch(console.log);
    },
};

const joinAttackFilter = (reaction, user) => {
    const criteria = [];
    // Respondee is no bot
    criteria.push(!user.bot);
    // Responded with the appropriate emoji
    criteria.push(reaction.emoji.name === emojis.accept);
    return criteria.every(element => element);
};

async function collectAcceptOP(op, user) {
    if (await op.isUserEnlisted(user.id)) {
        console.log(`User ${user.username} is already enlisted`);
        return;
    }

    // Add the user to the TroopIndexes
    const resultingIndex = await op.enlistUser(user.id);
    console.log(`Registered user ${resultingIndex.userid} for op with id ${resultingIndex.op_id}`);
}

function pendingAcceptOP(message, op) {
    // Run the collector for 12 hours
    const troopCollector = message.createReactionCollector(joinAttackFilter, { time: 30 * 1000 });

    // Method on collection
    troopCollector.on('collect', async (_reaction, user) => await collectAcceptOP(op, user));

    troopCollector.on('end', _collected => {
        message.channel.send(`Enlisting by reacting to the OP creation message is closed for ${op.city}\nYou can still enlist by adding troops using \`!troopadd ${op.op_id}\`.`);
    });
}

// Populate the MessageEmbed object
function loadEmbed(op) {
    const embed = new Discord.MessageEmbed();
    embed.title = `${op.organiser} started an OP targeting ${op.city}`;
    embed.description = `Press ${emojis.accept} to join!`;
    embed.timestamp = op.createdAt;
    embed.addField('OPID', op.op_id);
    return embed;
}