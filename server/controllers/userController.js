const User = require('../models/User');
const mongoose = require('mongoose');

exports.login = async (req, res) => {
    console.log('Login attempt:', req.body);
    try {
        const { email, name, picture } = req.body;
        
        // Log connection state
        console.log('MongoDB connection state:', mongoose.connection.readyState);
        
        let user = await User.findOne({ email });
        console.log('Existing user:', user);
        
        if (!user) {
            console.log('Creating new user with data:', {
                email,
                name,
                avatar: picture,
                role: 'vendor',
                status: 'active',
                join_date: new Date(),
                last_active: new Date()
            });

            user = await User.create({
                email,
                name,
                avatar: picture,
                role: 'vendor',
                status: 'active',
                join_date: new Date(),
                last_active: new Date()
            });
            console.log('New user created:', user);
        }

        user.last_active = new Date();
        await user.save();
        console.log('User saved:', user);

        res.json(user);
    } catch (error) {
        console.error('Login error:', error.stack);
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        console.log('Update profile for user:', req.user);
        
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User ID not found in request' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Only allow updating certain fields
        const allowedUpdates = ['name', 'avatar'];
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                user[key] = req.body[key];
            }
        });

        user.last_active = new Date();
        await user.save();
        
        console.log('Updated user:', user);
        res.json(user);
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getVendors = async (req, res) => {
    try {
        const vendors = await User.find({ role: 'vendor', status: 'active' });
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 