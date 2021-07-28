const IncomingMessage = require("../models/IncomingMessage");
const ShortCode = require("../models/ShortCode");

/**
 * Check Origin from Localhost
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkOrigin(req, res, next) {
    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let local = ip.split(":").pop();
    if (local == 1 || local == "127.0.0.1") {
        next();
    } else {
        next()
        // res.status(401).send("Unauthorized");
    }
}

/**
 * This will update the status of message
 * FAILED
 * DELIVER
 * @param {} body 
 */
function processMessage(req, res, next) {
    let queryParams = req.query;
    allSmsHandler(queryParams)
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

async function allSmsHandler(message) {
    const msg = decodeMessages(message);
    console.log(message)
    const codes = await ShortCode.findOne({ value: message.to }).exec().catch(err => console.log(err));
    console.log(codes)
    if (!codes) {
        return {
            processed: false,
            message: "Short Code not Found",
        };
    }
    let smsAll = IncomingMessage({
        message: msg ? msg : message.content,
        shortCode: message.to,
        phoneNumber: message.from,
        receivedDate: new Date(),
        ownedBy: codes.ownedBy
    });

    await smsAll.save()

    if (smsAll) {
        return { processed: true };
    }
    return { processed: false };
}

function decodeMessages(message) {
    if (message.binary && message.coding == 8) {
        let ms = message.binary.match(/.{1,4}/g);
        msg = "";
        ms.forEach((element) => {
            msg = msg + String.fromCodePoint("0x" + element);
        });
        return msg;
    }
}

module.exports = { processMessage, checkOrigin }