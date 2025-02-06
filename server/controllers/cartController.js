const Cart = require('../models/Cart');
const Market = require('../models/Market');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.email });
        if (!cart) {
            return res.json({ items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { marketId, productName, quantity = 1 } = req.body;

        // Find the market and product
        const market = await Market.findById(marketId);
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }

        const product = market.Products.find(p => p.name === productName);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        let cart = await Cart.findOne({ user: req.user.email });

        if (!cart) {
            cart = new Cart({
                user: req.user.email,
                items: [{
                    name: product.name,
                    price: product.price,
                    quantity
                }]
            });
        } else {
            const existingItem = cart.items.find(item => 
                item.name === product.name
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    name: product.name,
                    price: product.price,
                    quantity
                });
            }
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productName } = req.params;
        
        const cart = await Cart.findOne({ user: req.user.email });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => 
            item.name !== productName
        );

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { productName } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const cart = await Cart.findOne({ user: req.user.email });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => 
            item.name === productName
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cartItem.quantity = quantity;
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 