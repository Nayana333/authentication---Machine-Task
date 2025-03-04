// const jwt = require('jsonwebtoken');
// module.exports = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.id;
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Token is not valid' });
//     }
// };

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

