const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
        unique: true,
        index: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        offer: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        bought_price: {
            type: Number,
            required: true
        },
        for_sale: {
            type: Boolean,
            default: false,
            validate: {
                validator: function (v) {
                    return v === false || this.quantity > 0;
                },
                message: "Cannot set for_sale to true if quantity is 0"
            }
        }
    }]
});

module.exports = mongoose.model('Inventory', inventorySchema);
