const mongoose = require('mongoose');
const User = require('../models/User');
const Business = require('../models/Business');
require('dotenv').config();

async function updateUserBusinesses() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_ATLAS_URI);
        console.log('Connected to MongoDB');

        // Get all businesses
        const businesses = await Business.find({});
        console.log(`Found ${businesses.length} businesses`);

        // Create a map of user IDs to their business IDs
        const userBusinessMap = new Map();
        
        businesses.forEach(business => {
            if (business.owner) {
                const ownerId = business.owner.toString();
                if (!userBusinessMap.has(ownerId)) {
                    userBusinessMap.set(ownerId, []);
                }
                userBusinessMap.get(ownerId).push(business._id);
            }
        });

        // Update each user
        for (const [userId, businessIds] of userBusinessMap) {
            console.log(`Updating user ${userId} with ${businessIds.length} businesses`);
            
            await User.findByIdAndUpdate(
                userId,
                { businesses: businessIds },
                { new: true }
            );
        }

        // Update users without businesses
        const updatedCount = await User.updateMany(
            { businesses: { $exists: false } },
            { businesses: [] }
        );
        console.log(`Updated ${updatedCount.modifiedCount} users with empty business arrays`);

        console.log('Successfully updated all users');
    } catch (error) {
        console.error('Error updating users:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the script
updateUserBusinesses(); 