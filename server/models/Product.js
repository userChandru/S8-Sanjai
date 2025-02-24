const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bought_price: {
        type: Number,
        required: true
    },
    selling_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    original_bank_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankProduct',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Validation to ensure base_price >= min_price
productSchema.pre('save', function (next) {
    if (this.base_price < this.min_price) {
        return next(new Error('base_price cannot be less than min_price'));
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
