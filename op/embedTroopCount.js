const { playerPledges } = require('../troopmathic/troopmathic');

// class TroopCountEmbed extends Discord.MessageEmbed {
//     constructor(op, attackerId, troopIndexes, idResolver) {
//         super();
//         this.setTitle(op.city);
//         this.setDescription(`${idResolver(attackerId)} enlisted the following troops.`);
//         this.addFields(...(playerPledges(troopIndexes)).map(obj => {
//             return { 
//                 name: obj.unit.name, 
//                 value: obj.amount,
//                 inline: true,
//             };
//         }));
//         this.addField('OPID', op.op_id);
//     }
// }

module.exports.troopCountEmbed = async (op, attackerId, troopIndex, idResolver) => {
    const fields = (playerPledges(troopIndex)).map(obj => {
        return { 
            name: obj.unit.name, 
            value: obj.amount,
            inline: true,
        };
    });
    fields.push({ name: 'OPID', value: op.op_id });
    return {
        title: op.city,
        description: `${await idResolver(attackerId)} enlisted the following troops.`,
        fields: fields,
    };
};