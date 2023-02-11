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
        const pin = tripData.map((trip) => trip.get({ plain: true }))[0];
        const formattedTrips = [];
        for(let i = 0; i < pin.trips.length; i++) {
            const trip = {
                id: pin.trips[i].id,
                title: pin.trips[i].title,
                date_start: pin.trips[i].date_start,
                date_end: pin.trips[i].date_end,
            };
            const journals = {};
            const journalIteration = pin.trips[i].journals;
            for(let i = 0; i < journalIteration.length; i++) {
                if(journals[journalIteration[i].label]) {
                    journals[journalIteration[i].label].push(journalIteration[i].content);
                } else {
                    journals[journalIteration[i].label] = [journalIteration[i].content];
                }
            }
            journalsFormatted = [];
            for(const [key, value] of Object.entries(journals)) {
                const formatObj = {
                    label: key,
                    content: [],
                }
                for(item in value) {
                    contentObj = {
                        entry: value[item],
                    }
                    formatObj.content.push(contentObj);
                }
                journalsFormatted.push(formatObj);
            }
            trip.journals = journalsFormatted;
            formattedTrips.push(trip);
        }
        const trips = formattedTrips;
        res.render('pin', {
            trips,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;