//this file will route all the api requests to the appropriate controller
const router = require('express').Router();
const jouranlRoutes = require('./journalRoutes');
const pinRoutes = require('./pinRoutes');
const tripRoutes = require('./tripRoutes');
const userRoutes = require('./userRoutes');

router.use('/journal', jouranlRoutes);
router.use('/pin', pinRoutes);
router.use('/trip', tripRoutes);
router.use('/user', userRoutes);


module.exports = router;