require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const session = require('express-session')
const connectDB = require('./config/db')

const logger = require('./lib/logger')

const app = express()
const port = process.env.PORT || 8000

// Connect to Database
connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

// Static Files
app.use(express.static('../public'))

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
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
app.use('/users', require('./routes/users'))
app.use('/pages', require('./routes/pages'))
app.use('/posts', require('./routes/posts'))

// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
