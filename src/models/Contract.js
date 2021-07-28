const mongoose = require('mongoose')

// let ShortCodeType = {
//     SHORT_CODE: 'SHORT_CODE',
//     PHONE: 'PHONE'
// }
const ContractSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: String, required: true },
        status: { type: String, required: true, default: 'PENDING' },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Contract', ContractSchema)