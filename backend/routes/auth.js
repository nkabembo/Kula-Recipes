const express = require('express')
const {registerUser,
    login,
    logout
} = require('../controllers/authController')
const upload = require('../upload')
const router = express.Router()

router.route('/Signup').post(upload.single('profileUrl'), registerUser)
//router.post('/Signup', registerUser)
router.post('/Login', login)
router.post('/Logout', logout)

module.exports= router