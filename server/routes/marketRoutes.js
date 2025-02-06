const express = require('express');
const router = express.Router();
const { 
    getMarkets, 
    getMarketWithProducts,
    getProductsByBusinessSector 
} = require('../controllers/marketController');

// Get all markets
router.get('/', getMarkets);

// Get products by business sector
router.get('/sector/:sector', getProductsByBusinessSector);

// Get single market with its products
router.get('/:id', getMarketWithProducts);

module.exports = router; 