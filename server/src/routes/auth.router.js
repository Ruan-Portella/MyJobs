const authRouter = require('express').Router();
const validations = require('../middlewares');
const authController = require('../controllers/auth.controller');

authRouter.post(
    '/signUp',
    validations.validateName,
    validations.validateEmail,
    validations.validatePassword,
    authController.signUpUser,
);

authRouter.post(
    '/',
    validations.validateEmail,
    validations.validatePassword,
    authController.signInUser,
);

module.exports = authRouter;
