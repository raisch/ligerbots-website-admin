const express = require('express')
const router = express.Router()
const controller = require('../controllers/post')

/**
 *  Page Routes
 *
 * GET /posts - list
 *
 * GET /posts/:id - show
 * DELETE /posts/:id
 *
 * GET /posts/new - new form
 * POST /posts
 *
 * GET /posts/edit/:id - edit form
 * PUT /posts/:id
 *
 * POST /posts/search
 *
 */

// GET  /posts - paginated list
router.get('/', controller.main)

// GET /posts/new - new user form
// NOTE: MUST COME BEFORE /posts/:id
router.get('/new', controller.new)

// // POST /posts - save user
// router.post('/', controller.save)

// // GET posts/:id - show user
// router.get('/:id', controller.show)

// // PUT /posts/:id - update user
// router.put('/:id', controller.update)

// // DELETE /posts/:id - delete user
// router.delete('/:id', controller.delete)

// // GET /posts/edit/:id - edit user form
// router.get('/edit/:id', controller.edit)

// router.post('/search', controller.find)

module.exports = router
