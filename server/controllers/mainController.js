const mongoose = require('mongoose')

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

  try {
    res.render(`index`, {
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
    res.render(`about`, {
      locals,
      messages
    })
  } catch (error) {
    console.log(error)
  }
}
