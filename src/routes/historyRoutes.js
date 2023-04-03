const express = require('express')
const router = express.Router()

const {
    getPatientInfo,
    getPatientMedDetails
} = require('../controllers/historyController')
router.get('/',getPatientInfo)
router.get('/medDetails',getPatientMedDetails)

module.exports = router