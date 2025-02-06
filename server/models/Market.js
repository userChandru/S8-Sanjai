const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const marketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bussinessName: {
        type: String,
        required: true
    },
    businessSector: {
        type: String,
        required: true
    },
    marketImage: String,
    capital: Number,
    annualTurnover: Number,
    profit: Number,
    rating: Number,
    location: String,
    partnerSince: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Market', marketSchema); 