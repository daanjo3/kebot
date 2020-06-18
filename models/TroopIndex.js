module.exports = (sequelize, DataTypes) => {
    return sequelize.define('troopindex', {
        op_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slingers: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        hoplites: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        horses: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        catapults: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        ls: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        triremes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
};