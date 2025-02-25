require('dotenv').config();
const mongoose = require('mongoose');

async function migrateToAtlas() {
    try {
        // Connect to local DB
        const localDB = await mongoose.createConnection('mongodb://localhost:27017/tradezone');
        
        // Connect to Atlas using environment variable
        const atlasDB = await mongoose.createConnection(process.env.MONGODB_ATLAS_URI);

        // Get all collections
        const collections = ['users', 'businesses', 'products', 'inventories'];

        for (const collectionName of collections) {
            console.log(`Migrating ${collectionName}...`);
            
            // Get data from local
            const data = await localDB.collection(collectionName).find({}).toArray();
            
            // Insert to Atlas
            if (data.length > 0) {
                await atlasDB.collection(collectionName).insertMany(data);
            }
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        process.exit(0);
    }
}

// Execute migration
migrateToAtlas(); 