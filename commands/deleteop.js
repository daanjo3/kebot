const { Ops, TroopIndex } = require('../dbObjects');

// Deletes an operation
module.exports = {
    name: 'deleteop',
    aliases: ['opdelete', 'opcancel', 'cancelop'],
    description: 'Delete a registered operation',
    args: true,
    cooldown: 5,
    usage: '[op_id]',
    async execute(message, args) {
        // Check that only an op id is provided
        if (args.length != 1) {
            message.reply('Only 1 argument should be provided, which is the op id');
            return;
        }

        // Delete the op in the database
        const rowCountOps = await Ops.destroy({ where: { op_id: args[0] } });
        // Check whether it actually existed
        if (!rowCountOps) return message.reply('That OP did not exist');
        // Also delete all the troop count rows for this operation
        const rowCountIndex = await TroopIndex.destroy({ where: { op_id: args[0] } });
        console.log(`Deleted ${rowCountIndex} rows for indexes`);

        return message.reply(`Operation with id ${args[0]} is deleted.`);
    },
};