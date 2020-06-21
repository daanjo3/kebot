const { Ops, TroopIndex, updateDriver } = require('../dbObjects');
const { idToUsername } = require('../etc/discordutil');

const Discord = require('discord.js');

const { emojis } = require('../etc/style');
const { filterQuotes } = require('../etc/argutil');

// Creates a new operation
module.exports = {
    name: 'driver',
    aliases: ['driverset', 'driverset'],
    description: 'Start a new operation',
    args: true,
    cooldown: 5,
    usage: 'OPID [driver name]',
    async execute(message, args) {
        // Check amount of arguments
        if (args.length == 0 || args.length > 2 || isNaN(args[0])) {
            message.channel.reply('Only 1 argument should be provided');
            return;
        }
        const OPID = args[0];

        let driver = message.author.id;
        if (args.length == 2 && message.mentions.users.first()) {
            driver = message.mentions.users.first().id;
        }

        const affectedRows = updateDriver(OPID, driver);
        await TroopIndex.upsert({ op_id: OPID, userid: driver });
        if (!affectedRows) {
            message.reply('Something went wrong while trying to update the op driver.');
            return;
        }

        const op = await Ops.findOne({ where: { op_id: OPID } });
        const username = await idToUsername(message.client, op.driver);

        const csDriverSet = `The CS Driver for OP ${op.city} has been set to: ${username}.`;
        const csDriverNotSet = `The CS Driver for OP ${op.city} was already ${username}.`;
        message.reply((affectedRows ? csDriverSet : csDriverNotSet));
    },
};