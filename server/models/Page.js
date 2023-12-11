const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PageSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
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

PageSchema.post('save', async function () {
  console.log(`PATH:${this.path} / CONTENT:${this.content}`)
})

module.exports = mongoose.model('Page', PageSchema)
