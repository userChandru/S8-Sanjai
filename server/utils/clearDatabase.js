const mongoose = require('mongoose');
const User = require('../models/User');
const Business = require('../models/Business');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const PurchaseHistory = require('../models/PurchaseHistory');

async function clearDatabase() {
    try {
        // Connect to MongoDB if not connected
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tradezone');
        }

        // Drop collections instead of just deleting documents
        const collections = [
            User.collection,
            Business.collection,
            Product.collection,
            Inventory.collection,
            PurchaseHistory.collection
        ];

        for (const collection of collections) {
            await collection.drop().catch(err => {
                // Ignore error if collection doesn't exist
                if (err.code !== 26) {
                    console.log(`Warning: ${err.message}`);
                }
            });
        }
        
        console.log('Database cleared successfully');
    } catch (error) {
        console.error('Error clearing database:', error);
        throw error;
    } finally {
        await mongoose.connection.close();
    }
}

// Execute the clear function
clearDatabase();

module.exports = clearDatabase; 