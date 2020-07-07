const nukeTypes = [
    'nuke-type-olu',
    'nuke-type-olucats',
    'nuke-type-ls',
];

const nukeSizes = [
    'nuke-size-s',
    'nuke-size-m',
    'nuke-size-l',
    'nuke-size-xl',
];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Nukes', {
        nukeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        ownerID: {
            type: DataTypes.STRING,
            references: {
                model: 'Users',
                key: 'userID',
            },
        },
        nukeType: {
            type: DataTypes.ENUM(nukeTypes),
            allowNull: false,
        },
        nukeSize: {
            type: DataTypes.ENUM(nukeSizes),
            allowNull: false,
        },
    });
};