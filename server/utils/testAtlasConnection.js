require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB Atlas...');
        
        const connection = await mongoose.connect(process.env.MONGODB_ATLAS_URI);
        
        if (connection.connection.readyState === 1) {
            console.log('✅ Successfully connected to MongoDB Atlas!');
            
            // Optional: List all collections
            const collections = await connection.connection.db.listCollections().toArray();
            console.log('\nAvailable collections:');
            collections.forEach(collection => console.log(`- ${collection.name}`));
        }
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

testConnection(); 