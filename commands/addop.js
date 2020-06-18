const { Ops } = require('../dbObjects');
const newOpEmbed = require('../op/embed_new_op');
const Discord = require('discord.js');

// Creates a new operation
module.exports = {
    name: 'addop',
    aliases: ['opadd'],
    description: 'Start a new operation',
    args: true,
    cooldown: 5,
    usage: '[city/op name]',
    async execute(message, args) {
        // Check amount of arguments
        if (args.length != 1) {
            message.channel.reply('Only 1 argument should be provided');
            return;
        }
        // Create the op
        const op = await Ops.create({ title: args[0], attacker: message.author.username });
        // Since SQLite doesn't provide the generate primary id, reload the op
        const fullOp = await Ops.findOne({ where: { title: op.title } });
        // Create the embed object
        const embed = loadEmbed(fullOp);
        
        // Return the result
        console.log(`${fullOp.attacker} started a new op ${fullOp.title} with id ${fullOp.op_id}`);
        message.channel.send({ embed: embed });
    },
};

// Populate the MessageEmbed object
function loadEmbed(op) {
    const embed = new Discord.MessageEmbed(newOpEmbed);
    embed.title = `OP: ${op.title} (id:${op.op_id})`;
    embed.author.name = op.attacker;
    embed.description = `${op.attacker} started an op.`;
    embed.timestamp = op.createdAt;
    return embed;
}