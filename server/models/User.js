const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { schools, roles } = require('../config')

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: schools,
      message: `School must be one of ${schools}`
    }
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: roles,
      message: `Role must be one of ${roles}`
    }
  },
  details: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('User', UserSchema)
