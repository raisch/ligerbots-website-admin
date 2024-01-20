const User = require('../models/User')

const { title, description, schools, grades, roles, types, defaults, DEBUGGING } = require('../config')

const utils = require('../lib/utils')

/**
 * GET /users
 */
exports.main = async (req, res) => {
  const perPage = 12
  const pageNum = Number(req.query.page) || 1
  const maxPages = 5

  const messages = await req.flash('info')

  const locals = {
    title,
    description,
    userid: req?.user?._id || '',
    username: req?.user?.username || '',
    messages,
    perPage,
    pageNum,
    maxPages,
    utils,
    DEBUGGING
  }

  try {
    const records = await User.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * pageNum - perPage)
      .limit(perPage)
      .exec()

    const count = await User.countDocuments({})
    locals.totalRecords = count
    locals.currentPage = pageNum
    locals.numPages = Math.ceil(count / perPage)

    // const count = await User.countDocuments({})

    res.render('users/main', {
      locals,
      records,
      pageNum,
      numPages: Math.ceil(count / perPage),
      maxPages,
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
    username: req?.user?.username || '',
    schools,
    grades,
    roles,
    types,
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
  const userData = {
    username: req.body?.username,
    firstname: req.body?.firstName,
    lastname: req.body?.lastName,
    notes: req.body?.notes,
    telnum: req.body?.telnum,
    emailaddr: req.body.email,
    school: req.body.school,
    grade: req.body?.grade,
    role: req.body?.role,
    type: req.body?.type
  }

  if (req.body?.password) {
    userData.password = utils.createHashedPassword(req.body.password)
  }

  const newUser = new User(userData)

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
      username: req?.user?.username || '',
      schools,
      roles,
      types,
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
      username: req?.user?.username || '',
      schools,
      grades,
      roles,
      types,
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
  const userData = {
    firstname: req.body?.firstName,
    lastname: req.body?.lastName,
    telnum: req.body?.telnum,
    emailaddr: req.body?.emailaddr,
    school: req.body?.school,
    grade: req.body?.grade,
    role: req.body?.role,
    type: req.body?.type,
    notes: req.body?.notes
  }

  if (req.body?.password) {
    userData.password = utils.createHashedPassword(req.body.password)
  }

  try {
    await User.findByIdAndUpdate(req.params.id, userData)
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
    description,
    username: req?.user?.username || ''
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
