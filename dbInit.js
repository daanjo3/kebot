const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Ops = sequelize.import('models/Ops');
const TroopIndex = sequelize.import('models/TroopIndex');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    const ops = [
        Ops.upsert({ title: 'TestOp', attacker: 'TestPlayer' }),
    ];
    await Promise.all(ops);
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);
