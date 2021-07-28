const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },       
    },
    { timestamps: true }
)

module.exports = mongoose.model('Customer', CustomerSchema)
