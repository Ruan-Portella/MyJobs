const authRouter = require('express').Router();
const validations = require('../middlewares');
const authController = require('../controllers/auth.controller');

authRouter.post(
    '/',
    validations.validateName,
    validations.validateEmail,
    validations.validatePassword,
    authController.signUpUser,
);

authRouter.post(
    '/signIn',
    validations.validateEmail,
    validations.validatePassword,
    authController.signInUser,
);

module.exports = authRouter;
