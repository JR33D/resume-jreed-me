const express = require('express')
const router = express.Router()

const  { 
    postContact
} = require('../controllers/contact-controller.js')

router.post('/', postContact)

module.exports = router