const router = require('express').Router();
const { Journal } = require('../../models');
const withAuth = require('../../utils/auth');

// this should create a journal entry
router.post('/', withAuth, async (req, res) => {
  try {
    const newJournal = await Journal.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newJournal);
  } catch (err) {
    res.status(400).json(err);
  }
});

// this should update a journal entry by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedJournal = await Journal.update(
      {
        label: req.body.label,
        content: req.body.content,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (!updatedJournal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.status(200).json(updatedJournal);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Failed to update journal entry', error: err });
  }
});

router.delete('/one', withAuth, async (req, res) => {
  try {
    const journalData = await Journal.destroy({
      where: {
        trip_id: req.body.trip_id,
        label: req.body.label,
        content: req.body.content,
      },
    });
    if (!journalData) {
      res.status(404).json({ message: 'No journal found with this id!' });
      return;
    }
    res.status(200).json(journalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/all', withAuth, async (req, res) => {
  try {
    const journalData = await Journal.destroy({
      where: {
        trip_id: req.body.trip_id,
        label: req.body.label,
      },
    });
    if (!journalData) {
      res.status(404).json({ message: 'No journal found with this id!' });
      return;
    }
    res.status(200).json(journalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
