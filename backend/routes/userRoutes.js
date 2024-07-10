const express = require('express');
const {
    regUser,
    loginUser
} = require('../controllers/userController');

const router = express.Router()

// register user
router.post("/register", regUser)
router.post("/login", loginUser)

module.exports = router