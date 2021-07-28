const IncomingMessage = require("../models/Customer");
const ShortCode = require("../models/Contract");
const Customer = require("../models/Customer");


/**
 * This will update the status of message
 * FAILED
 * DELIVER
 * @param {} body 
 */
function create(req, res, next) {
    let queryParams = req.query;
    createHandler(queryParams)
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

async function createHandler(body) {
   
    let customer = Customer({
      fullName:body.fullName,
      address:body.address
    });

    await customer.save()

    if (customer) {
        return { processed: true };
    }
    return { processed: false };
}



module.exports = { create  }