const express = require('express');
const app = express();
require('./app/middleware/db');

const bodyParse = require('body-parser');

require('dotenv').config();
app.use(express.json());
app.use(bodyParse.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
