const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const testimonialRoute = require('./testimonialRoute')
router.use('/user', authRoute);
router.use('/testimonial',testimonialRoute);

module.exports = router;
