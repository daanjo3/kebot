module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ops', {
        op_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.STRING,
        },
        driver: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        organiser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};