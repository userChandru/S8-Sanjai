const mongoose = require('mongoose');
const User = require('../models/User');
const Business = require('../models/Business');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

// Import data from data2 folder
const userData = require('../../client/src/data2/Userdata').default;
const businessData = require('../../client/src/data2/Database').default;
const productData = require('../../client/src/data2/Productdata').default;

async function seedNewDatabase() {
    try {
        // 1. Create Users
        const users = await User.create(
            userData.map(user => ({
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.image,
                join_date: new Date(user.joinDate),
                last_active: new Date(user.lastActive),
                status: user.status
            }))
        );

        // 2. Create Products (base products)
        const products = await Product.create(
            businessData.flatMap(business => 
                business.products.map(product => ({
                    product_name: product.name,
                    product_description: product.description,
                    product_image: product.image,
                    product_type: 'Physical', // Default type
                    product_category: business.businessSector,
                    base_price: product.price,
                    min_price: product.price * 0.8 // 20% below base price
                }))
            )
        );

        // 3. Create Businesses and their Inventories
        for (const businessData of businessData) {
            // Find corresponding user
            const owner = users.find(u => u.email === businessData.email);
            
            // Create Business
            const business = await Business.create({
                owner: owner._id,
                business_name: businessData.bussinessName,
                business_sector: businessData.businessSector,
                capital: businessData.capital,
                annual_turnover: businessData.annualTurnover,
                business_image: businessData.marketImage,
                rating: businessData.rating,
                location: businessData.location
            });

            // Create Inventory for business
            const inventoryProducts = businessData.products.map(prod => {
                const baseProduct = products.find(p => p.product_name === prod.name);
                return {
                    product: baseProduct._id,
                    price: prod.price,
                    quantity: prod.quantity,
                    bought_price: prod.price * 0.7, // Example: 30% margin
                    for_sale: true
                };
            });

            await Inventory.create({
                business: business._id,
                products: inventoryProducts
            });
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
}

module.exports = seedNewDatabase; 