const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const categoryRoute = require('./categoryRoute');

router.use('/user', authRoute);
router.use('/category', categoryRoute);
module.exports = router;
