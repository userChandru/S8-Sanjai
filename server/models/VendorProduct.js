const mongoose = require('mongoose');

const vendorProductSchema = new mongoose.Schema({
    ven_prod_id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    ven_prod_name: {
        type: String,
        required: true
    },
    ven_prod_bought_price: {
        type: Number,
        required: true,
        min: 0
    },
    ven_prod_new_price: {
        type: Number,
        required: true,
        min: 0
    },
    ven_prod_offer: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    ven_prod_stock: {
        type: Number,
        required: true,
        min: 0
    },
    ven_prod_image: {
        type: String, // URL
        required: true
    },
    ven_prod_desc: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('VendorProduct', vendorProductSchema); 