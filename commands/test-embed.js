const opEmbed = require('../op/embed_add_op');

module.exports = {
    name: 'test-embed',
    alias: ['te'],
    description: 'Displays a testing MessageEmbed',
    guildOnly: true,
    execute(message, _args) {
        message.channel.send({ embed: opEmbed });
    },
};