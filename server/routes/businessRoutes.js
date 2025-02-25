const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');

// All routes are protected
router.post('/', auth, validateRequest('business'), businessController.createBusiness);
router.get('/', auth, businessController.getAllBusinesses);
router.get('/:id', auth, businessController.getBusinessById);
router.put('/:id', auth, validateRequest('business'), businessController.updateBusiness);
router.delete('/:id', auth, businessController.deleteBusiness);

module.exports = router; 