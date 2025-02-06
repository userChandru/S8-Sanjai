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
    Products: [productSchema],
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
    }
});

module.exports = mongoose.model('Market', marketSchema); 