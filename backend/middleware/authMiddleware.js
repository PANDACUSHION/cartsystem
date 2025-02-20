const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);  // Attach user info to the request object
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

const authorizeAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
    next();
};

module.exports = { authenticate, authorizeAdmin };
