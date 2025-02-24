const mongoose = require('mongoose');

const purchaseHistorySchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    purchased_products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        original_price: {  // Price before offer
            type: Number,
            required: true
        },
        final_price: {  // Price after offer is applied
            type: Number,
            required: true
        }
    }],
    total_price: {
        type: Number,
        required: true
    },
    purchase_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for performance optimization
purchaseHistorySchema.index({ buyer: 1, seller: 1, purchase_date: -1 });

module.exports = mongoose.model('PurchaseHistory', purchaseHistorySchema);
