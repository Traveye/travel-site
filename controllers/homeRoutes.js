const router = require('express').Router();
const { User, Pin, Trip, Journal } = require('../models/index');

router.get('/', (req, res) => {
    //TODO: add logic to check if user is logged in/redirect to dashboard if true
    const logo = {
        imagePath: '/images/dropin.PNG',
        imageAlt: 'Drop In logo',
      };

    const showNav = false;
    res.render('login', logo);
});

router.get('/dashboard', (req, res) => {
    //TODO: add logic to check if user is logged in/redirect to login if false
    //TODO: add logic to get user's pins, trips, and journals to pass to handlebars
    const showNav = true;
    res.render('dashboard', showNav);
})

module.exports = router;

