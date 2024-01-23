const { JWT_SECRET } = require("./config")
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer')) {
        return res.status(403).json({});
    }
    const token = auth.split(' ')[1];
    try {
        const decode = jwt.decode(token, JWT_SECRET);
        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(403).json({});
    }
}


module.exports = { authMiddleware }