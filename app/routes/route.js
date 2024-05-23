const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const portfolioRoute= require('./portfolioRoute')

router.use('/user', authRoute);
router.use('/portfolio',portfolioRoute);

module.exports = router;
