module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TeamMembers', {
        teamID: {
            type: DataTypes.INTEGER,
            refenences: {
                model: 'Teams',
                key: 'teamID',
            },
        },
        memberID: {
            type: DataTypes.STRING,
            references: {
                model: 'Users',
                key: 'userID',
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'team-role-member',
        },
    });
};