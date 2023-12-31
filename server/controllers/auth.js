const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET

// Register a new user - BOOTSTRAP ONLY
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
      console.log(JSON.stringify({ user }, null, 2))
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (!result) {
          res.status(400).json({
            message: 'User failed to log in.'
          })
          return
        }

        const maxAge = 3 * 60 * 60

        const payload = { id: user._id, username: user.username, role: user.role }
        const options = { expiresIn: maxAge } // 3hrs in seconds
        const token = jwt.sign(payload, JWT_SECRET, options)

        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: maxAge * 1000 // 3hrs in millis
        })

        res.status(201).json({
          message: 'User logged in.',
          user: user._id,
          role: user.role
        })
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}

// const logout = (req, res, next) => { // handled by auth middleware

module.exports = { register, login }
