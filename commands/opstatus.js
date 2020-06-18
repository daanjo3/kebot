const { Ops } = require('../dbObjects');
const { loadEmbed } = require('../op/embed_check_op');

module.exports = {
    name: 'opstatus',
    aliases: ['statusop'],
    description: 'Check the details for an op',
    args: true,
    cooldown: 5,
    usage: '[op id]',
    async execute(message, args) {
        // Check that only an op id is provided
        if (args.length != 1) {
            message.reply('One argument should be provided, the op id');
            return;
        }
        // Check whether an op with that id exists
        const op_id = args[0];
        const op = await Ops.findOne({ where: { op_id: op_id } });
        if (!op) {
            message.reply('That op did not exist');
            return;
        }

        // Get the troop indexes for the selected op
        const troopIndexes = await op.getIndex();

        // Create the MessageEmbed
        const embed = loadEmbed(op, troopIndexes);
        return message.reply({ embed: embed });
    },
};