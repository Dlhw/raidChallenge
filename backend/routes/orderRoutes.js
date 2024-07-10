const express = require('express')
const {
    createOrder,
    getOrder,
    getOrders,
    deleteOrder,
    updateOrder
} = require('../controllers/orderController')

const router = express.Router()


// GET all order
router.get("/", getOrders)

// GET single order 
router.get("/:id", getOrder)

// POST a new order
router.post('/', createOrder)

// delete a new order
router.delete('/:id', deleteOrder)

// UPDATE a new order
router.patch('/:id', updateOrder)


module.exports = router
