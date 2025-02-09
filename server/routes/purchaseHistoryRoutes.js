const express = require('express');
const router = express.Router();
const { 
    getAllPurchases,
    getPurchaseById,
    createPurchase,
    getUserPurchases
} = require('../controllers/purchaseHistoryController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllPurchases);
router.get('/:id', auth, getPurchaseById);
router.post('/', auth, createPurchase);
router.get('/user/:userId', auth, getUserPurchases);

module.exports = router; 