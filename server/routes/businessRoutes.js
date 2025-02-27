const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const auth = require('../middleware/auth');

// All routes are protected
router.post('/', auth, businessController.createBusiness);
router.get('/', auth, businessController.getAllBusinesses);
router.get('/:id', auth, businessController.getBusinessById);
router.put('/:id', auth, businessController.updateBusiness);
router.delete('/:id', auth, businessController.deleteBusiness);
router.get('/owner/:userId', auth, businessController.getBusinessesByOwner);

module.exports = router; 