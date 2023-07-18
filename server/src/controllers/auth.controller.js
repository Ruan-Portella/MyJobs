const bcrypt = require('bcrypt');
const authService = require('../services/auth.service');

const signUpUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const response = await authService.signUpUser(fullName, email, passwordHash);
    if (response.message) return res.status(400).json({ message: response.message });
    return res.status(201).json({ message: response });
};

const signInUser = async (req, res) => {
    const { email, password, remember } = req.body;
    const response = await authService.signInUser(email, password, remember);
    if (response.message) return res.status(400).json({ message: response.message });
    return res.status(200).json(response);
};

module.exports = {
    signUpUser,
    signInUser,
};
