const Cart = require('../models/Cart');
const Product = require('../models/Product');
const BankProduct = require('../models/BankProduct');
const VendorProduct = require('../models/VendorProduct');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.user._id })
            .populate('seller_id', 'user_name user_email')
            .populate({
                path: 'items.product_id',
                select: 'name description image price bank_prod_price ven_prod_new_price'
            });

        if (!cart) {
            return res.json({ items: [], total: 0 });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { product_id, product_type, quantity, seller_id } = req.body;
        const user_id = req.user._id;

        // Find existing cart for the user
        let cart = await Cart.findOne({ user_id });

        // Strict seller validation
        if (cart && cart.seller_id && cart.seller_id.toString() !== seller_id.toString()) {
            return res.status(400).json({
                message: 'You already have items from a different seller in your cart. Please clear your cart first or complete your current purchase.'
            });
        }

        // Get product details based on product_type
        let product;
        switch (product_type) {
            case 'Product':
                product = await Product.findById(product_id);
                break;
            case 'BankProduct':
                product = await BankProduct.findById(product_id);
                break;
            case 'VendorProduct':
                product = await VendorProduct.findById(product_id);
                break;
            default:
                return res.status(400).json({ message: 'Invalid product type' });
        }

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Verify the product belongs to the seller
        const productSellerId = product.seller_id || product.bank_id || product.vendor_id;
        if (productSellerId && productSellerId.toString() !== seller_id.toString()) {
            return res.status(400).json({ message: 'Product does not belong to the specified seller' });
        }

        if (cart) {
            // Check if product already exists in cart
            const existingItemIndex = cart.items.findIndex(item => 
                item.product_id.toString() === product_id.toString()
            );

            if (existingItemIndex !== -1) {
                // Update quantity of existing item
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item
                const price = product.price || product.bank_prod_price || product.ven_prod_new_price;
                cart.items.push({
                    product_id,
                    product_type,
                    quantity,
                    price,
                    seller_id
                });
            }
        } else {
            // Create new cart
            cart = new Cart({
                user_id,
                seller_id, // Set seller_id when creating new cart
                items: [{
                    product_id,
                    product_type,
                    quantity,
                    price: product.price || product.bank_prod_price || product.ven_prod_new_price,
                    seller_id
                }],
                total: 0
            });
        }

        // Update total
        cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        await cart.save();
        
        // Populate the response with product details
        const populatedCart = await Cart.findById(cart._id)
            .populate('seller_id', 'user_name user_email')
            .populate({
                path: 'items.product_id',
                select: 'name description image price bank_prod_price ven_prod_new_price'
            });

        res.json(populatedCart);

    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const cart = await Cart.findOne({ user_id: req.user._id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the specific item to remove
        const itemIndex = cart.items.findIndex(item => 
            item._id.toString() === itemId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Remove only the specific item
        cart.items.splice(itemIndex, 1);

        // Update total
        cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // If cart is empty after removing item
        if (cart.items.length === 0) {
            await Cart.findByIdAndDelete(cart._id);
            return res.json({ 
                message: 'Cart is now empty', 
                cart: { items: [], total: 0 } 
            });
        } else {
            await cart.save();
            
            // Populate the response with product details
            const populatedCart = await Cart.findById(cart._id)
                .populate('seller_id', 'user_name user_email')
                .populate({
                    path: 'items.product_id',
                    select: 'name description image price bank_prod_price ven_prod_new_price'
                });

            res.json({ 
                message: 'Item removed successfully', 
                cart: populatedCart 
            });
        }
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const cart = await Cart.findOne({ user_id: req.user._id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => 
            item._id.toString() === itemId
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cartItem.quantity = quantity;
        cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        await cart.save();
        
        const populatedCart = await Cart.findById(cart._id)
            .populate('seller_id', 'user_name user_email')
            .populate({
                path: 'items.product_id',
                select: 'name description image price bank_prod_price ven_prod_new_price'
            });

        res.json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user_id: req.user._id });
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 