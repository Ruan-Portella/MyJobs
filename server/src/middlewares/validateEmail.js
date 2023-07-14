const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
        return res.status(400).json({ message: 'O campo "email" deve ser um email válido' });
    }

    return next();
};

module.exports = validateEmail;
