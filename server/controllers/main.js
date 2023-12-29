const { title, description } = require('../config')

/**
 * GET /
 */
exports.main = async (req, res) => {
  const messages = await req.flash('info')

  const locals = {
    title,
    description
  }

  // if we don't yet have a jwt token, redirect to the login page

  try {
    res.render('index', {
      locals,
      messages
    })
  } catch (error) {
    console.log(error)
  }
}

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
