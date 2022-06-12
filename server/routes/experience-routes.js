const express = require('express')
const router = express.Router()

const  { 
    getExperiences
} = require('../controllers/experience-controller.js')

router.get('/', getExperiences)

module.exports = router