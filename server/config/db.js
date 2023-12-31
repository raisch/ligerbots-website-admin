const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
  console.log(`connecting to ${MONGODB_URI}`)
  try {
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(MONGODB_URI)
    console.log(`Database Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
