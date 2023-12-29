require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const session = require('express-session')
const connectDB = require('./config/db')

const logger = require('./lib/logger')

const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 3000

// Connect to Database
connectDB()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))

// Static Files
app.use(express.static('../public'))

// Express Session
const sessionSecret = process.env.SECRET_KEY
app.use(
  session({
    name: 'ligerbots',
    secret: sessionSecret,
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
  })
)

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }))

// Templating Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// Logging
app.use(logger)

// Routes
app.use('/', require('./routes/main'))
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/pages', require('./routes/pages'))
app.use('/posts', require('./routes/posts'))

// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404')
})

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// Handle unhandled errors.
process.on('unhandledRejection', err => {
  console.log(`An unhandled error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})
