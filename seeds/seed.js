const sequelize = require('../config/connection');
const { User, Pin, Trip, Journal } = require('../models/index');
const userData = require('./userData.json');
const pinData = require('./pinData.json');
const tripData = require('./tripData.json');
const journalData = require('./journalData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    
    await Pin.bulkCreate(pinData, {
        individualHooks: true,
        returning: true,
    });
    
    await Trip.bulkCreate(tripData, {
        individualHooks: true,
        returning: true,
    });
    
    await Journal.bulkCreate(journalData, {
        individualHooks: true,
        returning: true,
    });
    
    process.exit(0);
};

seedAll();