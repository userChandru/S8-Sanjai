const express = require('express');
const router = express.Router();
const { 
    getCart, 
    addToCart, 
    removeFromCart, 
    updateCartItem 
} = require('../controllers/cartController');

// Get user's cart
router.get('/', getCart);

// Add item to cart
router.post('/add', addToCart);

// Remove item from cart
router.delete('/item/:productName', removeFromCart);

// Update cart item quantity
router.put('/item/:productName', updateCartItem);

module.exports = router; 