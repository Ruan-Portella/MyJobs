/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

module.exports = app;
