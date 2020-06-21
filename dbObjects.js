const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Ops = sequelize.import('models/Ops');
const TroopIndex = sequelize.import('models/TroopIndex');

Ops.prototype.enlistUser = async function(userid) {
    return await TroopIndex.create({ op_id: this.op_id, userid: userid });
};

Ops.prototype.setTroops = async function(userid, unit, amount) {
    let playerIndex = await TroopIndex.findOne({
        where: { op_id: this.op_id, userid: userid },
    });

    if (!playerIndex) {
        playerIndex = await TroopIndex.create({ op_id: this.op_id, userid: userid });
    }

    setTroops(playerIndex, unit, amount);
    return await playerIndex.save();
};

Ops.prototype.getIndex = async function() {
    return await TroopIndex.findAll({
        where: { op_id: this.op_id },
    });
};

Ops.prototype.getIndexByPlayer = async function(attackerId) {
    return await TroopIndex.findOne({
        where: { op_id: this.op_id, userid: attackerId },
    });
};

Ops.prototype.isUserEnlisted = async function(userid) {
    const opindex = await TroopIndex.findAll({ where: { 
        [Op.and]: [
            { op_id: this.op_id },
            { userid: userid },
        ],
    } });
    return opindex.length > 0;
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

async function updateDriver(OPID, driver) {
    const affectedRows = await Ops.update({ driver: driver }, { where: { op_id: OPID } });
    await TroopIndex.upsert({ op_id: OPID, userid: driver });
    return affectedRows;
}

module.exports = { Ops, TroopIndex, updateDriver };