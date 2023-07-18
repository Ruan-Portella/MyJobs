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

const verifyIfIsGoogleUser = async (email) => {
    const user = await findUserByEmail(email);
    if (user.googleId) throw new Error('You have to sign in with Google');
    return true;
};

const signInUser = async (email, password, remember) => {
    try {
        const config = remember ? { algorithm: 'HS256', expiresIn: '30d' } : { algorithm: 'HS256', expiresIn: '1h' };

        const user = await findUserByEmail(email);

        await validatePassword(password, user);

        const token = jwt.sign({ id: user.id, name: user.fullName }, Secret, config);

        return { name: user.fullName, token };
    } catch (error) {
        return { message: error.message };
    }
};

const signWithGoogle = async (fullName, email, googleId) => {
    try {
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { fullName, email, googleId },
        });

        const newUser = user || created;

        const token = jwt.sign({ id: newUser.id, name: newUser.fullName }, Secret, { algorithm: 'HS256', expiresIn: '30d' });

        return { name: user.fullName, token };
    } catch (error) {
        return { message: error.message };
    }
};

module.exports = {
    signUpUser,
    signInUser,
    signWithGoogle,
    verifyIfIsGoogleUser,
};
