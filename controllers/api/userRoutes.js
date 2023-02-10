const router = require('express').Router();
// requiring express as router
const { User } = require('../../models');
// requiring User model in order to 

// route is to signup a user
router.post('/', async (req, res) => {
  try {
    // the signup body needs the username, display_name(full name), and password in order to be created
    const dbUserData = await User.create({
      username: req.body.username,
      display_name: req.body.display_name,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this route is for those who would like to log in
router.post('/login', async (req, res) => {
  // the try saying username and password have to match to be logged in
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
  });
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect Username or Password. Please try again!❌' });
      return;
    }
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect Username or Password. Please try again!❌' });
      return;
    }
    // saves the session
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!✅' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this route is to logout does it by destroying the session 
router.post('/logout', (req, res) => {
  // conditional to see if it is logged in and if so the log out.
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// exporting them so dir api file index.js can pull/require the data from this file.
module.exports = router;