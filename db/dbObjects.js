const Sequelize = require('sequelize');

// Connect to the database and store the connection in the sequelize constant
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Nukes = sequelize.import('../models/Nukes');
const OpParticipants = sequelize.import('../models/OpParticipants');
const Ops = sequelize.import('../models/Ops');
const OpTroops = sequelize.import('../models/OpTroops');
const TeamMembers = sequelize.import('../models/TeamMembers');
const Teams = sequelize.import('../models/Teams');
const Users = sequelize.import('../models/Users');

module.exports = {
    Nukes: Nukes,
    OpParticipants: OpParticipants,
    Ops: Ops,
    OpTroops: OpTroops,
    TeamMembers: TeamMembers,
    Teams: Teams,
    Users: Users,
};