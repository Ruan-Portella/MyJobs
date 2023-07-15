const userRouter = require('express').Router();
const validations = require('../middlewares');
const userController = require('../controllers/user.controller');

userRouter.get('/', validations.validateToken, userController.getAllUserJobs);

module.exports = userRouter;
