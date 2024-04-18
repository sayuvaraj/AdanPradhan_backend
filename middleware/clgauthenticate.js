const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sayuvaraj';

// Middleware to fetch college user from JWT token
const clgAuthenticate = async (req, res, next) => {
    try {
        // Get the college user from the jwt token and add id to req object
        const clgToken = req.header('clg_token');
        if (!clgToken) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const decodedToken = jwt.verify(clgToken, SECRET_KEY);
        if (!decodedToken || !decodedToken.clg_user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.clg_user = decodedToken.clg_user;
        next();
    } catch (error) {
        console.error('Error authenticating college user:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
}

module.exports = clgAuthenticate;
