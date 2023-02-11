const router = require('express').Router();
const { User, Pin, Trip, Journal } = require('../models/index');

router.get('/', (req, res) => {
    //TODO: add logic to check if user is logged in/redirect to dashboard if true
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    //TODO: add logic to check if user is logged in/redirect to login if false
    //TODO: add logic to get user's pins, trips, and journals to pass to handlebars
    res.render('dashboard');
});

// :id is the pin id (when the user clicks on a pin)
router.get('/pin/:id', async (req, res) => {
    try {
        const tripData = await Pin.findAll({
            where: {
                id: req.params.id,
            },
            include: [
                { 
                    model: Trip,
                    include: [
                        {
                            model: Journal,
                        },
                    ],
                },
            ],
        });
        const trips = tripData.map((trip) => trip.get({ plain: true }));
        res.render('pin', {
            trips,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;