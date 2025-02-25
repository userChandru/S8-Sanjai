const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.post('/', auth, productController.createProduct);
router.get('/', auth, productController.getAllProducts);
router.get('/:id', auth, productController.getProductById);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

// Additional routes
router.get('/category/:category', auth, productController.getProductsByCategory);
router.get('/type/:type', auth, productController.getProductsByType);

module.exports = router; 