const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { _, createHashedPassword } = require('../lib/utils')

const { schools, grades, roles, types } = require('../config')

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  fullname: {
    type: String
  },
  emailaddr: {
    type: String
  },
  telnum: {
    type: String,
    default: '000-000-0000'
  },
  school: {
    type: String,
    lowercase: true,
    enum: {
      values: schools,
      message: `School must be one of ${schools}`
    },
    default: 'none'
  },
  grade: {
    type: String,
    enum: {
      values: grades,
      message: `Grade must be one of ${grades}`
    },
    default: 'none'
  },
  type: {
    type: String,
    lowercase: true,
    enum: {
      values: types,
      message: `Type must be one of ${types}`
    },
    default: 'other'
  },
  role: {
    type: String,
    lowercase: true,
    enum: {
      values: roles,
      message: `Role must be one of ${roles}`
    },
    default: 'user'
  },
  notes: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String
  },
  updatedBy: {
    type: String
  }
}, {
  timestamps: true // adds createdAt, updatedAt
})

UserSchema.pre('validate', async function (next) {
  if (!(_.isNonEmptyString(this.username) || _.isNonEmptyString(this.emailaddr))) {
    throw new Error('User requires either a username or an email address')
  }

  // if username is blank but emailaddr is not, set username to emailaddr
  if (!_.isNonEmptyString(this.username) && _.isNonEmptyString(this.emailaddr)) {
    this.username = this.emailaddr
  }

  // if firstname and lastname are not blank, set fullname
  if (_.isNonEmptyString(this.firstname) && _.isNonEmptyString(this.lastname)) {
    this.fullname = `${this.firstname} ${this.lastname}`
  }

  if (_.isNonEmptyString(this.password)) {
    console.log(`hashing password: ${this.password}`)
    try {
      this.password = createHashedPassword(this.password)
    } catch (err) {
      throw new Error(`failed to hash password: ${err}`)
    }
  }

  next()
})

module.exports = mongoose.model('User', UserSchema)
