const { Ops, TroopIndex } = require('../dbObjects');

// Deletes an operation
module.exports = {
    name: 'removeop',
    aliases: ['opremove', 'opdelete', 'deleteop'],
    description: 'Delete an OP.',
    args: true,
    cooldown: 5,
    guildOnly: true,
    usage: 'OPID',
    async execute(message, args) {
        // Check that only an op id is provided
        if (args.length != 1) {
            message.reply('Only 1 argument should be provided, which is the OPID');
            return;
        }

        const OPID = args[0];

        const op = await Ops.findOne({ where: { op_id: OPID } });
        if (!op) {
            message.reply(`Could not find an OP with id ${OPID}.`);
            return;
        }
        // Delete the op in the database
        const rowCountOps = await Ops.destroy({ where: { op_id: OPID } });
        // Check whether it actually existed
        if (!rowCountOps) return message.reply(`Could not delete an OP with id ${OPID}.`);
        // Also delete all the troop count rows for this operation
        const rowCountIndex = await TroopIndex.destroy({ where: { op_id: OPID } });
        console.log(`Deleted ${rowCountIndex} rows for indexes.`);

        return message.reply(`OP ${op.city} with id ${OPID} is deleted.`);
    },
};