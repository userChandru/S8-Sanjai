const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    capital: {
        type: Number,
        required: true
    },
    annualTurnover: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        required: true
    },
    marketImage: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    location: String,
    partnerSince: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Business', businessSchema); 