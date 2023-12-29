const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET

// Register a new user
const register = async (req, res, next) => {
  const { username, password, firstName, lastName, role, type } = req.body

  bcrypt.hash(password, 10).then(async hash => {
    await User.create({
      username,
      password: hash,
      firstName,
      lastName,
      type,
      role
    })
      .then(user =>
        res.status(200).json({
          message: 'User created',
          user
        })
      )
      .catch(error =>
        res.status(400).json({
          message: 'User not created',
          error: error.message
        })
      )
  })
}

// Login with an existing user
const login = async (req, res, next) => {
  const { username, password } = req.body
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: 'Username or Password not present'
    })
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({
        message: 'Login not successful',
        error: 'User not found'
      })
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60
          const token = jwt.sign(
            {
              id: user._id,
              username,
              role: user.role
            },
            JWT_SECRET,
            {
              expiresIn: maxAge
            } // 3hrs in seconds
          )
          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000 // 3hrs in millis
          })
          res.status(201).json({
            message: 'User logged in.',
            user: user._id
          })
        } else {
          res.status(400).json({
            message: 'User failed to log in.'
          })
        }
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}

const logout = (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}

module.exports = { register, login, logout }
