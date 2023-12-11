const mongoose = require('mongoose')

const { title, description } = require('../config')
const Post = require('../models/Post')

const view = 'posts'

/**
 * GET /posts
 */
exports.main = async (req, res) => {
  const messages = await req.flash('info')
  const locals = { title, description }

  try {
    res.render(`${view}/main`, {
      locals,
      messages
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /posts/new
 * New Post Form
 */
exports.new = async (req, res) => {
  const locals = {
    title: 'Add New Post',
    description
  }

  res.render(`${view}/new`, locals)
}

/**
 * POST /
 * Create New Post
 */
exports.save = async (req, res) => {

  const newPost = new Post({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email
  })

  try {
    await Post.create(newPost)
    await req.flash('info', 'Added new post.')

    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}
