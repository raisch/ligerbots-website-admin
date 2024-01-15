const { title, description } = require('../config')

/**
 * GET /
 */
exports.main = async (req, res) => {
  const messages = await req.flash('info')

  const locals = {
    title,
    description,
    username: req?.user?.username || ''
  }

  try {
    res.render('index', {
      locals,
      messages
    })
  } catch (error) {
    console.log(error)
  }
}

/** GET /login */
exports.login = async (req, res) => {
  const messages = await req.flash('info')
  const locals = {
    title,
    description
  }
  res.render('login', { locals, messages })
}

/** GET /logout */
exports.logout = async (req, res) => {
  const messages = await req.flash('info')
  const locals = {
    title,
    description
  }
  res.render('logout', { locals, messages })
}

/** GET /logout */
// Handled by auth middleware

/**
 * GET /about
 */
exports.about = async (req, res) => {
  const messages = await req.flash('info')
  const locals = { title, description }

  try {
    res.render('about', {
      locals,
      messages
    })
  } catch (error) {
    console.log(error)
  }
}
