const mongoose = require('mongoose');

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
      }
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ]
  })
)

module.exports = User;