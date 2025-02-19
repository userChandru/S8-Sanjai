const BankProduct = require('../models/BankProduct');
const Product = require('../models/Product');
const User = require('../models/User');

exports.purchaseFromBank = async (req, res) => {
    try {
        const { bank_product_id, quantity } = req.body;
        const buyer_id = req.user._id;

        // Find the bank product
        const bankProduct = await BankProduct.findById(bank_product_id);
        if (!bankProduct) {
            return res.status(404).json({ message: 'Bank product not found' });
        }

        // Check quantity availability
        if (bankProduct.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient quantity available' });
        }

        // Create new product in buyer's inventory
        const newProduct = await Product.create({
            name: bankProduct.name,
            description: bankProduct.description,
            bought_price: bankProduct.bank_prod_price,
            selling_price: bankProduct.bank_prod_price, // Initial selling price same as bought price
            quantity: quantity,
            image: bankProduct.image,
            owner_id: buyer_id,
            original_bank_product: bank_product_id
        });

        // Update bank product quantity
        bankProduct.quantity -= quantity;
        await bankProduct.save();

        // Return the newly created product
        res.status(201).json({
            message: 'Product purchased successfully',
            product: await Product.findById(newProduct._id)
                .populate('original_bank_product', 'bank_prod_price')
        });

    } catch (error) {
        console.error('Purchase error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateSellingPrice = async (req, res) => {
    try {
        const { product_id, new_price } = req.body;
        const owner_id = req.user._id;

        const product = await Product.findOne({ _id: product_id, owner_id });
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.selling_price = new_price;
        await product.save();

        res.json({
            message: 'Price updated successfully',
            product: await Product.findById(product._id)
                .populate('original_bank_product', 'bank_prod_price')
        });

    } catch (error) {
        console.error('Update price error:', error);
        res.status(500).json({ message: error.message });
    }
}; 