const Contract = require("../models/Contract")
const Customer = require("../models/Customer")

/**
 * Get Customer by MAX_Limit
 * @returns Promise
 */
function getCustomers() {
    return Customer.find({}).limit(10).sort('createdAt').exec()
}
/**
 * Remove Customer after sent to client
 * @param {*} _id 
 * @returns 
 */
function deleteCustomer(_id) {
    return Customer.deleteOne({ _id }).catch(err => console.log(err))
}
/**
 * Save sent Customer with CustomerID
 * @param {*} body 
 * @returns 
 */
function saveCustomer(body, CustomerId) {
    const customer = new Customer({ phoneNumber: body.phoneNumber, Customer: body.Customer, shortCode: body.shortCode, ownerId: body.ownerId, CustomerId: CustomerId })
    return customer.save().catch(err => console.log(err))
}


/**
 * Update Costumer 
 * @param {*} body 
 * @param {*} status 
 * @returns 
 */
function updateCustomer(body, status) {
    return Customer.updateOne({ CustomerId: body.id }, { status }, { upsert: false })
}
/**
 * Get CustomerID
 * @param {*} id 
 * @returns 
 */
function getCustomerContract(id) {
    return Contract.find({ customerId: id }).exec()
}


module.exports = {
    getCustomers,
    deleteCustomer,
    updateCustomer,
    saveCustomer,
    getCustomerContract
}