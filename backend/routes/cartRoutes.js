const express = require('express')
const {
    createCart,
    getCart,
    deleteCart,
    updateCart
} = require('../controllers/cartController')

const router = express.Router()


// GET single fruit 
router.get("/:userid", getCart)

// POST a new fruit
router.post('/', createCart)

// delete a new fruit
router.delete('/:userid', deleteCart)

// UPDATE a new fruit
router.patch('/:userid', updateCart)


module.exports = router
