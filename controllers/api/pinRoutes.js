const router = require('express').Router();
const { where } = require('sequelize');
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
            where: {
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(allPins);
    } catch (err) {
        res.status(400).json(err);
    }
});






module.exports = router;