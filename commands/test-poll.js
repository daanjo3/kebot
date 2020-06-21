const { Ops } = require('../dbObjects');
const newOpEmbed = require('../op/embed_add_op');
const Discord = require('discord.js');

// Creates a new operation
module.exports = {
    name: 'testpoll',
    aliases: ['polltest'],
    description: 'Test the polling command',
    args: false,
    cooldown: 5,
    async execute(message, _args) {

        const acceptEmoji = '✅';
        const rejectEmoji = '❌';

        const filter = (reaction, user) => {
            return (reaction.emoji.name === acceptEmoji || reaction.emoji.name === rejectEmoji) && !user.bot;
        };
        
        message.channel.send('Wanna fight?').then(message => {
            message.react(acceptEmoji);
            message.react(rejectEmoji);
            
            const collector = message.createReactionCollector(filter, { time: 10000} );

            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name === acceptEmoji) {
                    message.channel.send(`${user.username} joins the frey.`)
                }
                if (reaction.emoji.name === rejectEmoji) {
                    message.channel.send(`${user.username} rather runs like a chicken.`)
                }
            })
    
            collector.on('end', collected => {
                console.log('poll ended');
            })

        }).catch(console.log)
    },
};