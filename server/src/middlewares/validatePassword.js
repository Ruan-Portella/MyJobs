const authService = require('../services/auth.service');

const validatePassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        await authService.verifyIfIsGoogleUser(req.body.email);

        if (!password) {
            return res.status(400).json({ message: 'O campo "password" é obrigatório' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
        }

        return next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = validatePassword;
