const { create } = require('../controllers/customer.controller');

const router = require('express')();

router.get("/api/sms", create)


module.exports=router
