const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    type: { type: String, enum: ['found', 'lost'], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
    date: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema);