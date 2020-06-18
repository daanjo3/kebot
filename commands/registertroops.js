const { Ops } = require('../dbObjects');

// Command which allows users to register available troops
module.exports = {
    name: 'registertroops',
    aliases: ['rt'],
    description: 'Register troops for an op. Keep in mind that amounts for the same unit will overwrite the previous set amount',
    args: true,
    cooldown: 5,
    usage: '[op id] [amount] [unit]',
    async execute(message, args) {
        if (args.length != 3) {
            message.reply('Three arguments should be provided, the op id, the unit name and unit count');
            return;
        }
        const op_id = args[0];
        // Check for valid unit name
        const unit_amount = args[1];
        const unit_name = args[2];
        if (isNaN(unit_amount)) {
            message.reply('The unit amount should be a number');
            return;
        }
        const op = await Ops.findOne({ where: { op_id: op_id } });
        if (!op) {
            message.reply('That op did not exist');
            return;
        }

        const playerIndex = await op.setTroops(message.author.username, unit_name, unit_amount);
        message.channel.send(`${playerIndex.username} enlisted ${unit_amount} ${unit_name} for op ${op.title}`);
    },
};