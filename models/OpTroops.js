module.exports = (sequelize, DataTypes) => {
    return sequelize.define('OpTroops', {
        OPID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Ops',
                key: 'OPID',
            },
        },
        nukeID: {
            type: DataTypes.STRING,
            references: {
                model: 'Nukes',
                key: 'nukeID',
            },
        },
    });
};