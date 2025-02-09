const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_role: {
        type: String,
        enum: ['vendor', 'bank', 'admin'],
        required: true
    },
    user_avatar: {
        type: String, // URL
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

module.exports = mongoose.model('User', userSchema); 