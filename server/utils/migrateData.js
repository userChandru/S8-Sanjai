const User = require('../models/User');
const Business = require('../models/Business');
const Product = require('../models/Product');

async function migrateData(oldData) {
    for (const data of oldData) {
        // Create User
        const user = await User.create({
            name: data.name,
            email: data.email,
            role: 'vendor',
            avatar: data.marketImage || 'default-avatar.png',
            joinDate: new Date(data.partnerSince)
        });

        // Create Business
        const business = await Business.create({
            owner: user._id,
            name: data.bussinessName,
            sector: data.businessSector,
            capital: data.capital,
            annualTurnover: data.annualTurnover,
            profit: data.profit,
            marketImage: data.marketImage,
            rating: data.rating,
            location: data.location,
            partnerSince: new Date(data.partnerSince)
        });

        // Create Products
        const productPromises = data.products.map(async (prod) => {
            const product = await Product.create({
                ...prod,
                business: business._id
            });
            return product._id;
        });

        const productIds = await Promise.all(productPromises);
        
        // Update business with product references
        business.products = productIds;
        await business.save();
    }
} 