const Market = require('../models/Market');
const Product = require('../models/Product');

// Get all markets
exports.getMarkets = async (req, res) => {
    try {
        const markets = await Market.find();
        res.json(markets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single market with its products
exports.getMarketWithProducts = async (req, res) => {
    try {
        const market = await Market.findById(req.params.id);
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }
        res.json(market);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products by business sector
exports.getProductsByBusinessSector = async (req, res) => {
    try {
        const { sector } = req.params;
        const markets = await Market.find({ businessSector: sector });
        res.json(markets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 