const express = require('express')
const {
    createFruit,
    getFruit,
    getFruits,
    deleteFruit,
    updateFruit
} = require('../controllers/fruitController')

const router = express.Router()

// GET all fruits
router.get("/", getFruits)

// GET single fruit 
router.get("/:id", getFruit)

// POST a new fruit
router.post('/', createFruit)

// delete a new fruit
router.delete('/:id', deleteFruit)

// UPDATE a new fruit
router.patch('/:id', updateFruit)

module.exports = router
