const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Ops = sequelize.import('models/Ops');
const TroopIndex = sequelize.import('models/TroopIndex');

// TroopIndex.belongsTo(Ops, { foreignKey: 'op_id', as: 'op' });

Ops.prototype.setTroops = async function(username, unit, amount) {
    let playerIndex = await TroopIndex.findOne({
        where: { op_id: this.op_id, username: username },
    });

    if (!playerIndex) {
        playerIndex = await TroopIndex.create({ op_id: this.op_id, username: username });
    }

    setTroops(playerIndex, unit, amount);
    return await playerIndex.save();
};

Ops.prototype.getIndex = async function() {
    return await TroopIndex.findAll({
        where: { op_id: this.op_id },
    });
};

function setTroops(troopIndex, unit, amount) {
    switch (unit) {
    case 'slingers':
    case 'sling':
    case 'slings':
        troopIndex.slingers = amount;
        return;
    case 'hoplites':
    case 'hops':
    case'hop':
        troopIndex.hoplites = amount;
        return;
    case 'horses':
    case 'horsemen':
    case 'horse':
        troopIndex.horses = amount;
        return;
    case 'cats':
    case 'cata':
    case 'catapult':
    case 'catapults':
        troopIndex.catapults = amount;
        return;
    case 'ls':
    case 'light':
    case 'lights':
        troopIndex.ls = amount;
        return;
    case 'tris':
    case 'tri':
    case 'trireme':
    case 'triremes':
    case 'remes':
        troopIndex.triremes = amount;
        return;
    default:
        console.log('No troops updated');
    }
    return;
}

module.exports = { Ops, TroopIndex };