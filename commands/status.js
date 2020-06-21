const { Ops } = require('../dbObjects');

// Command which allows users to register available troops
module.exports = {
    name: 'status',
    aliases: ['opstatus', 'statusop', 'setopstatus', 'setstatus'],
    description: 'Set the status message for an op',
    args: true,
    cooldown: 5,
    guildOnly: true,
    usage: 'OPID "status message"',
    async execute(message, args) {
        if (args.length != 2 || isNaN(args[0])) {
            message.reply('Two arguments should be provided, the OPID and the status message.');
            return;
        }
        const OPID = args[0];
        const status = args[1];
        const affectedRows = await Ops.update({ status: status }, { where: { op_id: OPID } });
        if (!affectedRows) {
            message.reply('Something went wrong while trying to update the op status.');
            return;
        }

        message.channel.send(`OP status updated to "${status}".`);
    },
};