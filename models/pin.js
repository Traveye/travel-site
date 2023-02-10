const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pin extends Model {}

Pin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        longitude: {
            type: DataTypes.DECIMAL(10, 8), // first # is precision which is how many digits total, scale is how many digits after the decimal point - may need to adjust depending on how many digits we need
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'pin',
    }
);

module.exports = Pin;