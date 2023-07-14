const validateName = (req, res, next) => {
    const { fullName } = req.body;

    if (!fullName) {
        return res.status(400).json({ message: 'O campo "nome" é obrigatório' });
    }
    if (fullName.length < 8) {
        return res.status(400).json({ message: 'O "nome" deve ter pelo menos 8 caracteres' });
    }

    return next();
};

module.exports = validateName;
