const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/login', userController.login);
console.log('User routes registered');

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.get('/vendors', auth, userController.getVendors);
router.get('/profile/businesses', auth, userController.getUserBusinesses);
router.get('/:id', auth, userController.getUserById);
router.get('/', auth, userController.getAllUsers);

module.exports = router; 