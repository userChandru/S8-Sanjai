const mongoose = require('mongoose');

/**
 * User Model
 * @example
 * {
 *   name: "Chandru",
 *   email: "chandru.cb22@bitsathy.ac.in",
 *   role: "vendor",
 *   avatar: "https://...",
 *   join_date: Date,
 *   last_active: Date,
 *   status: "active"
 * }
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['vendor', 'bank', 'admin'],
        default: 'vendor'
    },
    avatar: {
        type: String,
        required: true
    },
    join_date: {
        type: Date,
        default: Date.now
    },
    last_active: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'active'
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    const schemaFields = require('../utils/schemaValidation').user.required_fields;
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

module.exports = mongoose.model('User', userSchema); 