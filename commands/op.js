const { Ops } = require('../dbObjects');
const { loadEmbed } = require('../op/embedOp');
const { idToUsername } = require('../etc/discordutil');

module.exports = {
    name: 'op',
    aliases: ['viewop', 'opview'],
    description: 'Check the details for an OP.',
    args: true,
    cooldown: 5,
    usage: 'OPID',
    async execute(message, args) {
        // Check that only an op id is provided
        if (args.length != 1) {
            message.reply('One argument should be provided, the OPID.');
            return;
        }
        // Check whether an op with that id exists
        const OPID = args[0];
        const op = await Ops.findOne({ where: { op_id: OPID } });
        if (!op) {
            message.reply('That op did not exist');
            return;
        }

        // Get the troop indexes for the selected op
        const troopIndexes = await op.getIndex();

        // Create the MessageEmbed
        const embed = await loadEmbed(op, troopIndexes, (id) => idToUsername(message.client, id));
        return message.reply({ embed: embed });
    },
};