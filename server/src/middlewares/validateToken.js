const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'secret';

const validateToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization;

        if (!bearerHeader) return res.status(401).send({ message: 'Token inválido' });

        const token = bearerHeader.split(' ')[1];

        const user = jwt.verify(token, SECRET);

        req.user = { id: user.id, name: user.name };

        return next();
    } catch (error) {
        return res.status(401).send({ message: 'Token Expirado ou inválido' });
    }
};

module.exports = validateToken;
