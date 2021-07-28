const { processMessage } = require('../controllers/customer.controller');

const router = require('express')();

router.get("/api/sms", processMessage)


module.exports=router
