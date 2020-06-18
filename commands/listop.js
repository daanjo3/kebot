const { Ops } = require('../dbObjects');

module.exports = {
    name: 'listop',
    aliases: ['oplist'],
    description: 'List all registered operations',
    args: false,
    cooldown: 5,
    async execute(message, _args) {
        const allOps = await Ops.findAll();
        const data = [];
        data.push('Here\'s a list of all registered operations:');
        data.push(allOps.map(op => `${op.op_id}:\t${op.title} started by ${op.attacker}`).join('\n'));
        return message.channel.send(data, { split: true });
    },
};