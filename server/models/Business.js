const mongoose = require('mongoose');

/**
 * Business Model
 * @example
 * {
 *   owner: ObjectId,
 *   business_name: "Rootz Prvt Limited",
 *   business_sector: "Grocery",
 *   capital: 15000,
 *   annual_turnover: 100000,
 *   business_image: "https://...",
 *   rating: 4.3,
 *   location: "Chennai, Tamil Nadu",
 *   inventory_id: ObjectId,
 *   collaborators: []
 * }
 */
const businessSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    business_sector: {
        type: String,
        required: true
    },
    capital: {
        type: Number,
        required: true
    },
    annual_turnover: {
        type: Number,
        required: true
    },
    business_image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    location: {
        type: String,
        required: true
    },
    inventory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory'
    },
    collaborators: [{
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business'
        },
        partnership_date: {
            type: Date,
            default: Date.now
        }
    }],
}, {
    timestamps: true
});

businessSchema.pre('save', function(next) {
    // Validate against schema definition
    const schemaFields = require('../utils/schemaValidation').business.required_fields;
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

module.exports = mongoose.model('Business', businessSchema); 