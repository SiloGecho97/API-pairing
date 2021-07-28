const { create, getCustomerContract, addContract, updateContract } = require('../controllers/customer.controller');

const router = require('express')();

router.post("/api/customer", create)
router.get("/api/customer/:id", getCustomerContract)
router.post('/api/contract', addContract)
router.put('/api/contract', updateContract)


router.post('/api/user', createUser)
module.exports = router
