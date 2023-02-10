const router = require('express').Router();
const { User, Pin, Trip, Journal } = require('../models/index');

router.get('/login', (req, res) => {
    res.render('login');
});