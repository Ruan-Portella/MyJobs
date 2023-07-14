const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/', authRouter);
app.use('/user', userRouter);

module.exports = app;
