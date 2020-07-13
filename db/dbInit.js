const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

sequelize.import('../models/Nukes');
sequelize.import('../models/OpParticipants');
sequelize.import('../models/Ops');
sequelize.import('../models/OpTroops');
sequelize.import('../models/TeamMembers');
sequelize.import('../models/Teams');
sequelize.import('../models/Users');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force });