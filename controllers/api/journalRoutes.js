const router = require("express").Router();
const { Journal } = require("../../models");
const withAuth = require("../../utils/auth");

// this should create a journal entry
router.post("/", withAuth, async (req, res) => {
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
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: req.params.id, user_id: req.session.user_id },
      req.body,
      { new: true }
    );

    if (!updatedJournal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    res.status(200).json(updatedJournal);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update journal entry", error: err });
  }
});

// this should delete the journal entry by its id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const journalData = await Journal.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!journalData) {
      res.status(404).json({ message: "No journal found with this id!" });
      return;
    }

    res.status(200).json(journalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
