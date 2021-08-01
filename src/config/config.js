require("dotenv").config()
const MONGO_OPTOINS = {
    minPoolSize: 1,
    maxPoolSize: 20,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    socketTimeoutMS: 60000,
    serverSelectionTimeoutMS: 60000
}
/**
 * Mongoo db connection setting
 */
console.log(process.env.MONGO_URL)
const MONGO = {
    url: process.env.MONGO_URL || 'mongodb://192.168.0.10/ivr',
    options: MONGO_OPTOINS
}

module.exports = { MONGO }
