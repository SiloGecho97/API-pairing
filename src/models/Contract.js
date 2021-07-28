const mongoose = require('mongoose')

// let ShortCodeType = {
//     SHORT_CODE: 'SHORT_CODE',
//     PHONE: 'PHONE'
// }
const ContractSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        type: { type: String, required: true },
        price: { type: String, required: true },
        customerId: { type: String, required: true },
        status: { type: String, required: true, default: 'PENDING' },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Contract', ContractSchema)
