const mongoose = require('mongoose');

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    userUuid: { type: String, required: true },
    lastLogin: { type: Date, required: true }
  }, {
    timestamps: true
  })
)

module.exports = User;