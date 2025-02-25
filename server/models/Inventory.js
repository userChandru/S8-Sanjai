const mongoose = require('mongoose');

/**
 * Inventory Model
 * @example
 * {
 *   business: ObjectId,
 *   products: [{
 *     product: ObjectId,
 *     price: 100,
 *     quantity: 50,
 *     offer: 10,
 *     bought_price: 80,
 *     for_sale: true
 *   }]
 * }
 */
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

inventorySchema.pre('save', function(next) {
    const schemaFields = require('../utils/schemaValidation').inventory.required_fields;
    const missingFields = [];

    for (let field in schemaFields) {
        if (!this[field]) {
            missingFields.push(field);
        }
    }

    if (missingFields.length > 0) {
        next(new Error(`Missing required fields: ${missingFields.join(', ')}`));
    } else {
        next();
    }
});

module.exports = mongoose.model('Inventory', inventorySchema);
