// this file is for all trip api routes
const router = require('express').Router();
const { Trip } = require('../../models');

// a route to add a new trip is completed
router.post('/', async (req, res) => {
  try {
    const tripData = await Trip.create({
      title: req.body.title,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      pin_id: req.body.pin_id,
      notes: req.body.notes,
    });
    res.status(200).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// a route to update a trip by id is completed
router.put('/:id', async (req, res) => {
  console.log(req.body);
  try {
    const tripData = await Trip.update(req.body, {
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
