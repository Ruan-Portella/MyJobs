const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const Secret = process.env.JWT_SECRET || 'secret';

const signUpUser = async (fullName, email, password) => {
    try {
        await User.create({ fullName, email, password });
        return 'User created successfully';
    } catch (error) {
        return { message: error.message };
    }
};

const findUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
    return user;
};

const validatePassword = async (password, user) => {
    const passwordValidate = await bcrypt.compare(password, user.password);
    if (!passwordValidate) throw new Error('Wrong password');
    return passwordValidate;
};

const signInUser = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        await validatePassword(password, user);

        const token = jwt.sign({ id: user.id, name: user.fullName }, Secret, { algorithm: 'HS256', expiresIn: '1d' });

        return { name: user.fullName, token };
    } catch (error) {
        return { message: error.message };
    }
};

module.exports = {
    signUpUser,
    signInUser,
};
