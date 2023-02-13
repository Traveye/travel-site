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

        coordinates: {
            type: DataTypes.GEOMETRY('POINT'), // format is [longitude, latitude]]
            allowNull: false,
        },
        location_name: {
            type: DataTypes.STRING,
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
