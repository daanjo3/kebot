module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Teams', {
        teamID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        teamName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });
};