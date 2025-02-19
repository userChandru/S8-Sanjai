require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Market = require('../models/Market');
const Product = require('../models/Product');
const BankProduct = require('../models/BankProduct');
const VendorProduct = require('../models/VendorProduct');

// Import your data from server/data instead of client/src/data2
const userData = require('../data/userData');
const marketData = require('../data/marketData');
const productData = require('../data/productData');

const seedDatabase = async () => {
    try {
        // Connect to MongoDB if not connected
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tradezone');
        }

        // Clear existing data
        await User.deleteMany({});
        await Market.deleteMany({});
        await VendorProduct.deleteMany({});
        await BankProduct.deleteMany({});
        await Product.deleteMany({});

        console.log('Existing data cleared');

        // Seed Users
        const users = await User.insertMany(
            userData.map(user => ({
                user_name: user.name,
                user_email: user.email,
                user_role: user.role,
                user_avatar: user.image,
                join_date: new Date(user.joinDate),
                last_active: new Date(user.lastActive),
                status: user.status
            }))
        );
        console.log(`✅ ${users.length} users seeded`);

        // Seed Markets with their products
        const markets = await Market.insertMany(
            marketData.map(market => ({
                name: market.name,
                email: market.email,
                bussinessName: market.bussinessName,
                businessSector: market.businessSector,
                marketImage: market.marketImage,
                capital: market.capital,
                annualTurnover: market.annualTurnover,
                profit: market.profit,
                rating: market.rating,
                location: market.location,
                partnerSince: market.partnerSince
            }))
        );
        console.log(`✅ ${markets.length} markets seeded`);

        // Create products for each market
        for (let i = 0; i < marketData.length; i++) {
            const marketProducts = marketData[i].products.map(product => ({
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                market: markets[i]._id,
                quantity: product.quantity,
                stock: product.quantity,
                isAvailable: true
            }));

            const savedProducts = await Product.insertMany(marketProducts);
            
            // Update market with product references
            await Market.findByIdAndUpdate(markets[i]._id, {
                $push: { products: { $each: savedProducts.map(p => p._id) } }
            });
        }

        console.log('Products seeded and linked to markets');

        // Final verification
        const userCount = await User.countDocuments();
        const marketCount = await Market.countDocuments();
        const productCount = await Product.countDocuments();

        console.log('\nFinal Database State:');
        console.log(`Users: ${userCount}`);
        console.log(`Markets: ${marketCount}`);
        console.log(`Products: ${productCount}`);

        console.log('\nDatabase seeded successfully ✅');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Execute the seed function
seedDatabase();