const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const { authenticate } = require('../middleware/auth')

/**
 *  User Routes
 *
 * GET /users - list
 *
 * GET /users/:id - show
 * DELETE /users/:id
 *
 * GET /users/new - new form
 * POST /users
 *
 * GET /users/edit/:id - edit form
 * PUT /users/:id
 *
 * POST /users/search
 *
 */

// GET  users - paginated list
router.get('/', controller.main)

// GET /users/new - new user form
// NOTE: MUST COME BEFORE /users/:id
router.get('/new', controller.new)

// POST /users - save user
router.post('/', authenticate, controller.save)

// GET users/:id - show user
router.get('/:id', controller.show)

// PUT /users/:id - update user
router.put('/:id', controller.update)

// DELETE /users/:id - delete user
router.delete('/:id', controller.delete)

// GET /users/edit/:id - edit user form
router.get('/edit/:id', controller.edit)

router.post('/search', controller.find)

module.exports = router
