const { Ops } = require('../dbObjects');
const { loadEmbed } = require('../op/embed_check_op');

// Command which allows users to register available troops
module.exports = {
    name: 'setopstatus',
    aliases: ['sos', 'opsetstatus'],
    description: 'Set the status message for an op',
    args: true,
    cooldown: 5,
    usage: '[op id] [status message]',
    async execute(message, args) {
        if (args.length != 2) {
            message.reply('Two arguments should be provided, the op id and the status message');
            return;
        }
        const op_id = args[0];
        const affectedRows = await Ops.update({ status: args[1] }, { where: { op_id: op_id } });
        if (!affectedRows) {
            message.reply('Something went wrong while trying to update the op status');
            return;
        }

        message.channel.send(`OP status updated to ${args[1]}`);
    },
};