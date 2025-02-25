const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

async function migrateDuplicateFields() {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_URI);
        console.log('Connected to MongoDB Atlas');

        // Get all users
        const users = await User.find({});
        console.log(`Found ${users.length} users to migrate`);

        for (const user of users) {
            // Update user document
            await User.findByIdAndUpdate(user._id, {
                // Set standardized fields
                join_date: user.joinDate || user.join_date || user.createdAt,
                last_active: user.lastActive || user.last_active || user.updatedAt,
                // Remove old fields
                $unset: {
                    joinDate: 1,
                    lastActive: 1
                }
            });
        }

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

migrateDuplicateFields(); 