module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Users', {
        userID: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        grepolisName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};