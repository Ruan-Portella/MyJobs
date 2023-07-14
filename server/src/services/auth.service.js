const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const signUpUser = async (fullName, email, password) => {
    try {
        await User.create({ fullName, email, password });
        return 'User created successfully';
    } catch (error) {
        return { message: error.message };
    }
};

const signInUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) return { message: 'User not found' };

        const passwordValidate = await bcrypt.compare(password, user.password);
        if (!passwordValidate) return { message: 'Wrong password' };

        const Secret = process.env.JWT_SECRET || 'secret';

        const token = jwt.sign({ id: user.id, name: user.fullName }, Secret, { algorithm: 'HS256', expiresIn: '600s' });

        return { name: user.fullName, token };
    } catch (error) {
        return { message: error.message };
    }
};

module.exports = {
    signUpUser,
    signInUser,
};
