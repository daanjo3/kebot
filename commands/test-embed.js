const opEmbed = require('../op/embed_new_op');

module.exports = {
    name: 'test-embed',
    alias: ['te'],
    description: 'Displays a testing MessageEmbed',
    guildOnly: true,
    execute(message, args) {
        message.channel.send({ embed: opEmbed });
    },
};