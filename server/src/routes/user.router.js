const userRouter = require('express').Router();

userRouter.post('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = userRouter;
