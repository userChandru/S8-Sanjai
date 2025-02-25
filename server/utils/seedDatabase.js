require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Business = require('../models/Business');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

// Import JSON data from data3
const userDataJSON = require('../../client/src/data3/users.json');
const businessData = require('../../client/src/data3/businesses.json');
const productDataJSON = require('../../client/src/data3/products.json');
const inventoryData = require('../../client/src/data3/inventories.json');

const seedDatabase = async () => {
    try {
        // Connect to Atlas instead of local
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGODB_ATLAS_URI);
            console.log('Connected to MongoDB Atlas');
        }

        // Clear existing data (if any)
        await User.deleteMany({});
        await Business.deleteMany({});
        await Product.deleteMany({});
        await Inventory.deleteMany({});

        console.log('Existing data cleared');

        // Maps for storing references
        const userMap = new Map();
        const productMap = new Map();
        const businessMap = new Map();
        const tempInventoryIds = new Map();  // To store temporary IDs

        // 1. Seed Users
        console.log('Seeding users...');
        for (const user of userDataJSON.users) {
            const newUser = await User.create(user);
            userMap.set(user.email, newUser._id);
        }
        console.log(`✅ Users seeded`);

        // 2. Seed Products
        console.log('Seeding products...');
        for (const product of productDataJSON.products) {
            const newProduct = await Product.create(product);
            productMap.set(product.product_name, newProduct._id);
        }
        console.log(`✅ Products seeded`);

        // 3. Seed Businesses with temporary inventory_ids
        console.log('Seeding businesses...');
        for (const business of businessData.businesses) {
            const owner_id = userMap.get(business.email);
            const temp_inventory_id = new mongoose.Types.ObjectId();  // Create temporary ID
            tempInventoryIds.set(business.email, temp_inventory_id);  // Store for later

            const newBusiness = await Business.create({
                owner: owner_id,
                business_name: business.business_name,
                business_sector: business.business_sector,
                capital: business.capital,
                annual_turnover: business.annual_turnover,
                business_image: business.business_image,
                rating: business.rating,
                location: business.location,
                inventory_id: temp_inventory_id  // Use temporary ID
            });
            businessMap.set(business.email, newBusiness._id);
        }
        console.log(`✅ Businesses seeded`);

        // 4. Seed Inventories and Update Businesses with real IDs
        console.log('Seeding inventories...');
        for (const inventory of inventoryData.inventories) {
            const business_id = businessMap.get(inventory.business_email);
            
            const products = inventory.products.map(prod => ({
                product: productMap.get(prod.product_name),
                price: prod.price,
                quantity: prod.quantity,
                offer: prod.offer,
                bought_price: prod.bought_price,
                for_sale: prod.for_sale
            }));

            const newInventory = await Inventory.create({
                business: business_id,
                products: products
            });

            // Update business with real inventory_id
            await Business.findByIdAndUpdate(business_id, {
                inventory_id: newInventory._id
            });
        }
        console.log(`✅ Inventories seeded`);

        // Final verification
        const userCount = await User.countDocuments();
        const businessCount = await Business.countDocuments();
        const productCount = await Product.countDocuments();
        const inventoryCount = await Inventory.countDocuments();

        console.log('\nFinal Database State:');
        console.log(`Users: ${userCount}`);
        console.log(`Businesses: ${businessCount}`);
        console.log(`Products: ${productCount}`);
        console.log(`Inventories: ${inventoryCount}`);

        console.log('\nDatabase seeded successfully ✅');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await mongoose.connection.close();
    }
};

// Execute the seed function
seedDatabase();

module.exports = seedDatabase;