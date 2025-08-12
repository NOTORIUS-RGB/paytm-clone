const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("No auth header or invalid format");
        return res.status(403).json({ message: "No auth header or invalid format" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token:", decoded);

        req.userId = decoded.userId;
        console.log("Set userId in req:", req.userId);

        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = {
    authMiddleware
}