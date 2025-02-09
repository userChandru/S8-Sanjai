const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
    prod_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    prod_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    purchased_offer: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
});

const purchaseHistorySchema = new mongoose.Schema({
    purchase_id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total_price: {
        type: Number,
        required: true,
        min: 0
    },
    purchase_date: {
        type: Date,
        default: Date.now
    },
    items: [purchaseItemSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('PurchaseHistory', purchaseHistorySchema); 