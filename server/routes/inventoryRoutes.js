const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');

// Core CRUD
router.get('/:businessId', auth, inventoryController.getInventoryByBusiness);
router.put('/:businessId/products', auth, inventoryController.updateProduct);

// Product management
router.post('/:businessId/products', auth, inventoryController.addProduct);
router.delete('/:businessId/products/:productId', auth, inventoryController.removeProduct);
router.patch('/:businessId/products/:productId/toggle-sale', auth, inventoryController.toggleProductSale);

// Stock management
router.patch('/:businessId/products/:productId/quantity', auth, inventoryController.updateQuantity);
router.patch('/:businessId/products/:productId/price', auth, inventoryController.updatePrice);
router.patch('/:businessId/products/:productId/offer', auth, inventoryController.updateOffer);

// Add this route
router.post('/:businessId/empty', auth, inventoryController.emptyInventory);

// Add this route at the top with other routes
router.get('/', auth, inventoryController.getAllInventories);

module.exports = router; 