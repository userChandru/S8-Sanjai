const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Auth Token:', token); // Debug log
        
        if (!token) {
            return res.status(401).json({ message: 'No auth token, access denied' });
        }

        // For testing purposes, let's create a mock user if no token
        // REMOVE THIS IN PRODUCTION
        if (token === 'test-token') {
            req.user = {
                _id: '67bc8f052e297060d7d98e39',
                name: 'Chandru Ramesh',
                email: 'chandru.cb22@bitsathy.ac.in'
            };
            console.log('Test User:', req.user); // Debug log
            return next();
        }

        // Verify token and get user
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        // Get or create user
        let user = await User.findOne({ email: payload.email });
        if (!user) {
            user = await User.create({
                email: payload.email,
                name: payload.name,
                avatar: payload.picture
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth Error:', error); // Debug log
        res.status(401).json({ message: 'Token is invalid' });
    }
};

module.exports = auth;