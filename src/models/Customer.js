const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: false },       
    },
    { timestamps: true }
)

module.exports = mongoose.model('Customer', CustomerSchema)
