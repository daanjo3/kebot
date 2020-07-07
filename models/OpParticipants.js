module.exports = (sequelize, DataTypes) => {
    return sequelize.define('OpParticipants', {
        OPID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Ops',
                key: 'OPID',
            },
        },
        participantID: {
            type: DataTypes.STRING,
            references: {
                model: 'Users',
                key: 'userID',
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};