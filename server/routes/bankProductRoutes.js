const express = require('express');
const router = express.Router();
const { 
    getAllBankProducts,
    getBankProductById,
    createBankProduct,
    updateBankProduct,
    deleteBankProduct
} = require('../controllers/bankProductController');
const auth = require('../middleware/auth');

router.get('/', getAllBankProducts);
router.get('/:id', getBankProductById);
router.post('/', auth, createBankProduct);
router.put('/:id', auth, updateBankProduct);
router.delete('/:id', auth, deleteBankProduct);

module.exports = router; 