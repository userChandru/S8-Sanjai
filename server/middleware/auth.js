const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const auth = (req, res, next) => {
    try {
        // Check for skipAuth in query params or body
        if (req.query.skipAuth === 'true' || req.body.skipAuth === true) {
            return next();
        }

        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // For development/testing, allow admin access
        if (token === '67bc31183d7caf05bb345ca4') {  // Using the sample user ID
            req.user = {
                _id: token,
                role: 'vendor',
                name: 'Sample User',
                email: 'user@tradezone.com'
            };
            return next();
        }
        if (token === '67c022db840e144cc3b07fd9') {
            req.user = {
                _id: token,
                role: 'admin',
                name: 'Admin',
                email: 'admin@tradezone.com'
            };
            return next();
        }

        // If skipAuth flag is present in body, bypass auth
        if (req.body && req.body.skipAuth === true) {
            return next();
        }

        // For other tokens, return unauthorized
        return res.status(401).json({ message: 'Token is invalid' });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Token is invalid' });
    }
};

module.exports = auth;