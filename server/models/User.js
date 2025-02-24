const mongoose = require('mongoose');

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
    joinDate: {
        type: Date,
        default: Date.now
    },
    lastActive: {
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

module.exports = mongoose.models.User || mongoose.model('User', userSchema); 