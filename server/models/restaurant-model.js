const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Restaurant = new Schema(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true }
  },
  { timestamps: true },
)

module.exports = mongoose.model('restaurants', Restaurant)