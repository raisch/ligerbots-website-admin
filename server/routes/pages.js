const express = require('express')
const router = express.Router()
const controller = require('../controllers/pageController')

/**
 *  Page Routes
 *
 * GET /pages - list
 *
 * GET /pages/:id - show
 * DELETE /pages/:id
 *
 * GET /pages/new - new form
 * POST /pages
 *
 * GET /pages/edit/:id - edit form
 * PUT /pages/:id
 *
 * POST /pages/search
 *
 */

// GET  /pages - paginated list
router.get('/', controller.main)

// GET /pages/new - new user form
// NOTE: MUST COME BEFORE /pages/:id
router.get('/new', controller.new)

router.post('/:id/publish', controller.publish)

// GET pages/:id - show user
router.get('/:id', controller.show)

// POST /pages - save user
router.post('/', controller.save)

// DELETE /pages/:id - delete user
router.delete('/:id', controller.delete)

// PUT /pages/:id - update user
router.put('/:id', controller.update)

// GET /pages/edit/:id - edit user form
router.get('/edit/:id', controller.edit)

// router.post('/search', controller.find)

module.exports = router
