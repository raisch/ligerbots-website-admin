const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req, res, next) => {
  // console.log(JSON.stringify({ headers: req.headers }))

  if (req.url === '/logout') {
    res.cookie('jwt', '', { maxAge: 1 }) // clear the cookie
    res.redirect('/')
    return
  }

  // allow api routes
  if (req.url === '/login' || req.url.startsWith('/api')) {
    // console.log('passing thru ', req.url)
    next()
    return
  }

  const token = req.cookies.jwt
  if (!token) {
    console.log('no token found')
    res.redirect('/login')
    return
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(JSON.stringify({ decodedToken }))

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    req.user = user

    // console.log('found user, moving on to ', req.url)

    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = { authenticate }
