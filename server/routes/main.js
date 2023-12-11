const express = require('express')
const router = express.Router()

const type = 'main'

const controller = require(`../controllers/${type}Controller`)

/**
 *  Page Routes
 */
router.get('/', controller.main)
router.get('/about', controller.about)

module.exports = router
