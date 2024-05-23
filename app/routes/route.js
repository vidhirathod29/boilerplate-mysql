const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const contactRoute = require('./contactRoute');

router.use('/user', authRoute);
router.use('/contact', contactRoute);
module.exports = router;
