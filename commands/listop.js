// Packages
const Discord = require('discord.js');

// DB
const { Ops } = require('../dbObjects');

// Utility
const { idToUsername } = require('../etc/discordutil');

module.exports = {
    name: 'list',
    aliases: ['oplist', 'listop'],
    description: 'List all registered operations',
    args: false,
    cooldown: 5,
    async execute(message, _args) {
        const allOps = await Ops.findAll();
        const embed = new Discord.MessageEmbed();

        embed.setTitle('OP Overview');
        embed.setColor('0xd1bf91');
        
        const opList = await Promise.all(allOps.map(op => overview(message.client, op)));
        console.log(opList);
        // TODO allow more than 25 ops to be shown (can have no more than 25 fields per message embed)
        embed.addFields(...opList);

        embed.setTimestamp();
        return message.channel.send({ embed: embed });
    },
};

const overview = async (client, op) => {
    const title = `City: ${op.city}`;
    const driver = (op.driver ? await idToUsername(client, op.driver) : 'None');
    return {
        name: title,
        value: `OPID: ${op.op_id}\nDriver: ${driver}\nStatus: ${op.status}`,
    };
};