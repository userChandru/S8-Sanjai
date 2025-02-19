const express = require('express');
const router = express.Router();
const { 
    getCart, 
    addToCart, 
    removeFromCart, 
    updateCartItem,
    clearCart
} = require('../controllers/cartController');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, getCart);

// Add item to cart
router.post('/add', auth, addToCart);

// Remove item from cart
router.delete('/item/:itemId', auth, removeFromCart);

// Update cart item quantity
router.put('/item/:productName', updateCartItem);

router.delete('/clear', auth, clearCart);

module.exports = router; 