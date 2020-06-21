const Discord = require('discord.js');
const { totalTroops, participants } = require('../troopmathic/troopmathic');

const template = {
    color: 0xd1bf91,
    title: '<OP title>',
    timestamp: new Date(),
    footer: {
        text: 'OP organised by Kabot',
        icon_url: 'https://i.imgur.com/wSTFkRM.png',
    },
};

// Populate the MessageEmbed
async function loadEmbed(op, troopIndexes, idResolver) {
    const embed = new Discord.MessageEmbed(template);
    
    embed.title = `${op.city}`;
    if (op.status) { embed.addField('Status', op.status); }
    if (op.driver) { embed.addField('CS Driver', await idResolver(op.driver)); }
    
    let troopValue = 'None';
    let participantsValue = 'None';
    if (troopIndexes.length) {
        troopValue = totalTroops(troopIndexes).map(troop => `${troop.unit}: ${troop.amount}`).join('\n');
        participantsValue = (await Promise.all(participants(troopIndexes).map(idResolver))).join('\n');
    }
    embed.addField('Troops', troopValue);
    embed.addField('Participants', participantsValue);

    embed.addField('OPID', op.op_id);

    embed.footer.text = `OP organised by ${await idResolver(op.organiser)}`;
    embed.timestamp = op.createdAt;
    return embed;
}

module.exports.loadEmbed = loadEmbed;