const express = require('express');
const router = express.Router();
const { 
    getAllVendorProducts,
    getVendorProductById,
    createVendorProduct,
    updateVendorProduct,
    deleteVendorProduct
} = require('../controllers/vendorProductController');
const auth = require('../middleware/auth');

router.get('/', getAllVendorProducts);
router.get('/:id', getVendorProductById);
router.post('/', auth, createVendorProduct);
router.put('/:id', auth, updateVendorProduct);
router.delete('/:id', auth, deleteVendorProduct);

module.exports = router; 