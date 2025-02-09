const mongoose = require('mongoose');

const bankProductSchema = new mongoose.Schema({
    bank_prod_id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    bank_prod_name: {
        type: String,
        required: true
    },
    bank_prod_price: {
        type: Number,
        required: true,
        min: 0
    },
    bank_prod_offer: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    bank_prod_stock: {
        type: Number,
        required: true,
        min: 0
    },
    bank_prod_image: {
        type: String, // URL
        required: true
    },
    bank_prod_desc: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BankProduct', bankProductSchema); 