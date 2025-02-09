const PurchaseHistory = require('../models/PurchaseHistory');

exports.getAllPurchases = async (req, res) => {
    try {
        const purchases = await PurchaseHistory.find()
            .populate('buyer_id')
            .populate('seller_id');
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPurchaseById = async (req, res) => {
    try {
        const purchase = await PurchaseHistory.findById(req.params.id)
            .populate('buyer_id')
            .populate('seller_id');
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPurchase = async (req, res) => {
    const purchase = new PurchaseHistory(req.body);
    try {
        const newPurchase = await purchase.save();
        res.status(201).json(newPurchase);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserPurchases = async (req, res) => {
    try {
        const purchases = await PurchaseHistory.find({
            $or: [
                { buyer_id: req.params.userId },
                { seller_id: req.params.userId }
            ]
        })
        .populate('buyer_id')
        .populate('seller_id');
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 