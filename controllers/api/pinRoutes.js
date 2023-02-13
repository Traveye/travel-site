const router = require('express').Router();
const { Pin } = require('../../models/index');

router.post('/', async (req, res) => {
    try {
        const newPin = await Pin.create({
            coordinates: req.body.coordinates,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPin);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const allPins = await Pin.findAll({
            // can add once log in function works
            where: {
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(allPins);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const onePin = await Pin.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(onePin);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedPin = await Pin.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(deletedPin);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;