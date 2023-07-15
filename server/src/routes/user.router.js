const userRouter = require('express').Router();
const validations = require('../middlewares');
const userController = require('../controllers/user.controller');

userRouter.get('/', validations.validateToken, userController.getAllUserJobs);
userRouter.post('/', validations.validateToken, userController.createJob);
userRouter.put('/', validations.validateToken, userController.updateJob);

module.exports = userRouter;
