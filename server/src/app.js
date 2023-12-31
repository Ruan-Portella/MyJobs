const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['https://ample-cushion-production.up.railway.app', 'http://localhost:3000', 'https://myjobs.ruanportella.dev'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/', authRouter);
app.use('/user', userRouter);

module.exports = app;
