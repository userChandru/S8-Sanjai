const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const auth = require('../middleware/auth');

router.post('/bank-purchase', auth, purchaseController.purchaseFromBank);
router.put('/update-price', auth, purchaseController.updateSellingPrice);

module.exports = router; 