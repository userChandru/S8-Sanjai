const Inventory = require('../models/Inventory');
const Business = require('../models/Business');

// Get inventory by business ID
exports.getInventoryByBusiness = async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ business: req.params.businessId })
            .populate('products.product');
        
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new product to inventory
exports.addProduct = async (req, res) => {
    try {
        const { productId, price, quantity, bought_price, skipAuth } = req.body;
        
        // Skip auth check if skipAuth flag is true
        if (!skipAuth) {
            // Check if user owns the business
            const business = await Business.findById(req.params.businessId);
            if (!business || business.owner.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized' });
            }
        }

        const inventory = await Inventory.findOne({ business: req.params.businessId });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        // Check if product already exists
        if (inventory.products.some(p => p.product.toString() === productId)) {
            return res.status(400).json({ message: 'Product already in inventory' });
        }

        inventory.products.push({
            product: productId,
            price,
            quantity,
            bought_price,
            offer: 0,
            for_sale: true,
        });

        await inventory.save();
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove product from inventory
exports.removeProduct = async (req, res) => {
    try {
        const { businessId, productId } = req.params;
        
        // Check if user owns the business
        const business = await Business.findById(businessId);
        if (!business || business.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const inventory = await Inventory.findOne({ business: businessId });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        inventory.products = inventory.products.filter(
            p => p.product.toString() !== productId
        );

        await inventory.save();
        res.json({ message: 'Product removed from inventory' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Toggle product sale status
exports.toggleProductSale = async (req, res) => {
    try {
        const { businessId, productId } = req.params;
        
        // Check if user owns the business
        const business = await Business.findById(businessId);
        if (!business || business.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const inventory = await Inventory.findOne({ business: businessId });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        const productIndex = inventory.products.findIndex(
            p => p.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }

        // Can't put product for sale if quantity is 0
        if (inventory.products[productIndex].quantity === 0) {
            return res.status(400).json({ message: 'Cannot put product for sale with zero quantity' });
        }

        inventory.products[productIndex].for_sale = !inventory.products[productIndex].for_sale;
        await inventory.save();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product quantity
exports.updateQuantity = async (req, res) => {
    try {
        const { businessId, productId } = req.params;
        const { quantity } = req.body;

        // Check if user owns the business
        const business = await Business.findById(businessId);
        if (!business || business.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const inventory = await Inventory.findOne({ business: businessId });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        const productIndex = inventory.products.findIndex(
            p => p.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }

        // If quantity becomes 0, set for_sale to false
        if (quantity === 0) {
            inventory.products[productIndex].for_sale = false;
        }

        inventory.products[productIndex].quantity = quantity;
        await inventory.save();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product price
exports.updatePrice = async (req, res) => {
    try {
        const { businessId, productId } = req.params;
        const { price } = req.body;

        // Check if user owns the business
        const business = await Business.findById(businessId);
        if (!business || business.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const inventory = await Inventory.findOne({ business: businessId });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        const productIndex = inventory.products.findIndex(
            p => p.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }

        inventory.products[productIndex].price = price;
        await inventory.save();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product offer
exports.updateOffer = async (req, res) => {
    try {
        const { businessId, productId } = req.params;
        const { offer } = req.body;

        // Check if user owns the business
        const business = await Business.findById(businessId);
        if (!business || business.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const inventory = await Inventory.findOne({ business: businessId });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        const productIndex = inventory.products.findIndex(
            p => p.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }

        // Validate offer percentage
        if (offer < 0 || offer > 100) {
            return res.status(400).json({ message: 'Offer must be between 0 and 100' });
        }

        inventory.products[productIndex].offer = offer;
        await inventory.save();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product details
exports.updateProduct = async (req, res) => {
    try {
        const { businessId } = req.params;
        
        // Check if user owns the business
        const business = await Business.findById(businessId);
        if (!business || business.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const inventory = await Inventory.findOne({ business: businessId });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        const productIndex = inventory.products.findIndex(
            p => p.product.toString() === req.body.productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }

        // Update allowed fields
        const allowedUpdates = ['price', 'quantity', 'offer', 'for_sale'];
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                inventory.products[productIndex][key] = req.body[key];
            }
        });

        await inventory.save();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Empty inventory
exports.emptyInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ business: req.params.businessId });
        
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        // Empty the products array
        inventory.products = [];
        await inventory.save();
        
        res.json({ message: 'Inventory emptied successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all inventories
exports.getAllInventories = async (req, res) => {
    try {
        const inventories = await Inventory.find()
            .populate('business')
            .populate('products.product');
        res.json(inventories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ... I'll continue with more methods if you want 