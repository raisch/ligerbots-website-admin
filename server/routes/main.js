const express = require('express')
const router = express.Router()

const controller = require('../controllers/main')

/**
 *  Main Routes
 */
router.get('/', controller.main)
router.get('/login', controller.login)
router.get('/about', controller.about)

module.exports = router
