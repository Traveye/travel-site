// this file is for all trip api routes
const router = require('express').Router();
const { Pin, Trip, Journal} = require('../../models');

// a route to get all trips is completed
// :id is the pin id (when the user clicks on a pin)
router.get('/:id', async (req, res) => {
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
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json(err);
    }
});

// a route to add a new trip is completed
router.post('/', async (req, res) => {
    try {
        const tripData = await Trip.create({
            title: req.body.title,
            date_start: req.body.date_start,
            date_end: req.body.date_end,
            pin_id: req.body.pin_id,
        });
        res.status(200).json(tripData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// a route to update a trip by id is completed
router.put('/:id', async (req, res) => {
    try {
        const tripData = await Trip.update(req.body, {    // may need to be more explicit with req.body depending on how the front end is sending the data
            where: {
                id: req.params.id,
            },
        });
        if (!tripData[0]) {
            res.status(404).json({ message: 'No trip found with this id!' });
            return;
        }
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// a route to delete a trip by id is completed
router.delete('/:id', async (req, res) => {
    try {
        const tripData = await Trip.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!tripData) {
            res.status(404).json({ message: 'No trip found with this id!' });
            return;
        }
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;