module.exports = {
    name: 'react',
    description: 'Test command to test reaction responses',
    args: false,
    cooldown: 5,
    execute(message, args) {

        const filter = (reaction, user) => {
            console.log(reaction.emoji.name);
            console.log(user.id === message.author.id);
            return reaction.emoji.name === 'wink' && user.id === message.author.id;
        };
        message.awaitReactions(filter, { max: 4, time: 15000, errors: ['time'] })
            .then(collected => console.log(collected.size))
            .catch(collected => {
                console.log(`After a 15 seconds, only ${collected.size} out of 4 reacted`);
            });
    },
};