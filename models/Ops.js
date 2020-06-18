module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ops', {
        op_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.STRING,
        },
        attacker: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};