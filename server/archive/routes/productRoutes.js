const express = require('express');
const router = express.Router();
const { 
    getAvailableProducts,
    addToVendorProducts
} = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/available', auth, getAvailableProducts);
router.post('/publish/:id', auth, addToVendorProducts);

module.exports = router; 