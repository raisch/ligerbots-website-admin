const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { _ } = require('../lib/utils')
const { schools, roles, types } = require('../config')

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  fullName: {
    type: String,
    required: true
  },
  tel: {
    type: String
  },
  school: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: schools,
      message: `School must be one of ${schools}`
    },
    default: 'none'
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: types,
      message: `Type must be one of ${types}`
    },
    default: 'other'
  },
  role: {
    type: String,
    required: true,
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
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

UserSchema.pre('validate', function (next) {
  if (_.isNonEmptyString(this.firstName) && _.isNonEmptyString(this.lastName)) {
    this.fullName = `${this.firstName} ${this.lastName}`
  }
  next()
})

module.exports = mongoose.model('User', UserSchema)
