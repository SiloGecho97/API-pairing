const mongoose = require('mongoose');

const IncomingMessageSchema = new mongoose.Schema(
    {
        message: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        shortCode: { type: String, required: true },
        ownedBy: { type: String, required: true }
        // status: { type: String, required: false, default: 'PENDING' }
    },
    { timestamps: true }
)

module.exports = mongoose.model('IncomingMessage', IncomingMessageSchema)
