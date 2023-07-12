/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

module.exports = app;
