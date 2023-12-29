const User = require('../models/User')

const { title, description, schools, roles, defaults } = require('../config')

const utils = require('../lib/utils')

/**
 * GET /users
 */
exports.main = async (req, res) => {
  const messages = await req.flash('info')
  const locals = { title, description, utils }

  const perPage = 12
  const page = req.query.page || 1

  try {
    const users = await User.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec()

    const count = await User.countDocuments({})

    res.render('users/main', {
      locals,
      users,
      current: page,
      pages: Math.ceil(count / perPage),
      messages
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /users
 * New User Form
 */
exports.new = async (req, res) => {
  const locals = {
    title: 'Add New User',
    description,
    schools,
    roles,
    defaults,
    utils
  }

  res.render('users/new', locals)
}

/**
 * POST /
 * Create New User
 */
exports.save = async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
    school: req.body.school,
    role: req.body.role
  })

  try {
    await User.create(newUser)
    await req.flash('info', 'User added.')
    res.redirect('/users')
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /users/:id
 * User Data
 */
exports.show = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })

    const locals = {
      title: 'Show User',
      description,
      schools,
      roles,
      defaults,
      utils,
      user
    }

    res.render('users/view', locals)
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /
 * Edit user Data
 */
exports.edit = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })

    const locals = {
      title: 'Edit User',
      description,
      schools,
      roles,
      defaults,
      utils,
      user
    }

    res.render('users/edit', locals)
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /
 * Update user Data
 */
exports.update = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      school: req.body.school,
      role: req.body.role,
      details: req.body.details,
      updatedAt: Date.now()
    })
    await req.flash('info', 'User updated.')
    await res.redirect('/users')
  } catch (error) {
    console.log(error)
  }
}

/**
 * Delete /:id
 * Delete user Data
 */
exports.delete = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id })
    await req.flash('info', 'User deleted.')
    res.redirect('/users')
  } catch (error) {
    console.log(error)
  }
}

/**
 * Get /
 * Search user Data
 */
exports.find = async (req, res) => {
  const locals = {
    title: 'Search user Data',
    description
  }

  try {
    const searchTerm = req.body.searchTerm
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '')

    const users = await User.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
      ]
    })

    res.render('search', {
      users,
      locals
    })
  } catch (error) {
    console.log(error)
  }
}
