const express = require('express')
const router = express.Router()

const  { 
    getSkills
} = require('../controllers/skill-controller.js')

router.get('/', getSkills)

module.exports = router