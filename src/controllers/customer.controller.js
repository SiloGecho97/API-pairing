const IncomingMessage = require("../models/Customer");
const ShortCode = require("../models/Contract");
const Customer = require("../models/Customer");
const customerService = require("../services/customer.service");
const Contract = require("../models/Contract");


/**
 * This will update the status of message
 * FAILED
 * DELIVER
 * @param {} body 
 */
function create(req, res, next) {
    let body = req.body;
    createHandler(body)
        .then((response) => {
            if (response.processed) {
                res.status(200).send("ACK/Jasmin");
                // next();
            } else {
                res.status(400).send("ACK/Jasmin");
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("ACK/Jasmin");
        });
}


function getCustomerContract(req, res, next) {
    console.log(req.params)
    CustomerContractHandler(req.params.id).then(data => res.status(200).send(data)).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}


function addContract(req, res, next) {
    addContractHandler(req.body).then(data => res.status(200).send(data)).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

function deleteContract(req, res, next) {
    deleteContractHandler(req.body).then(data => res.status(200).send(data)).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

function updateContract(req, res, next) {
    updateContractHandler(req.body).then(data => res.status(200).send(data)).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}


async function updateContractHandler(body) {
    if (!body.customerId) throw "Invalid customer id"

}

async function CustomerContractHandler(id) {
    const contract = await customerService.getCustomerContract(id)
    return contract;
}


async function addContractHandler(body) {
    let customer = Contract({
        name: body.name,
        type: body.type,
        customerId: body.customerId,
        price: body.price
    });

    await customer.save()

    if (customer) {
        return customer;
    }
    throw "Failed ";
}


async function createHandler(body) {

    let customer = Customer({
        fullName: body.fullName,
        address: body.address
    });

    await customer.save()

    if (customer) {
        return { processed: true };
    }
    return { processed: false };
}



module.exports = { create, getCustomerContract, addContract, updateContract }