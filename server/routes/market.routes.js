const router = require('express').Router();
const Market = require('../models/Market');

// Get all markets
router.get('/', async (req, res) => {
  try {
    const markets = await Market.find().populate('products');
    res.json(markets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single market
router.get('/:id', async (req, res) => {
  try {
    const market = await Market.findById(req.params.id).populate('products');
    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }
    res.json(market);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create market
router.post('/', async (req, res) => {
  const market = new Market(req.body);
  try {
    const newMarket = await market.save();
    res.status(201).json(newMarket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 