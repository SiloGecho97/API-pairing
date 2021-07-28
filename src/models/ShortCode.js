const mongoose = require('mongoose')

// let ShortCodeType = {
//     SHORT_CODE: 'SHORT_CODE',
//     PHONE: 'PHONE'
// }
const ShortCodeSchema = new mongoose.Schema(
    {
        value: { type: String, required: true },
        type: { type: String, required: true, default: "SHORT_CODE" },
        status: { type: String, required: true, default: 'AVAIL' },
        ownedBy: { type: String, required: false }
    },
    { timestamps: true }
)

module.exports = mongoose.model('ShortCode', ShortCodeSchema)
