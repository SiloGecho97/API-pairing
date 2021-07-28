const { create } = require('../controllers/customer.controller');

const router = require('express')();

router.post("/api/sms", create)
router.get("/api/sms")

module.exports = router
