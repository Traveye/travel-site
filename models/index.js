const User = require('./User');
const Pin = require('./Pin');
const Trip = require('./Trip');
const Journal = require('./Journal');

User.hasMany(Pin, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    });

Pin.belongsTo(User, {
    foreignKey: 'user_id',
    });

Pin.hasMany(Trip, {
    foreignKey: 'pin_id',
    onDelete: 'CASCADE',
    });

Trip.belongsTo(Pin, {
    foreignKey: 'pin_id',
    });

Trip.hasMany(Journal, {
    foreignKey: 'trip_id',
    onDelete: 'CASCADE',
    });

module.exports = { User, Pin, Trip, Journal };

