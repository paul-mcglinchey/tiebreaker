const mongoose = require('mongoose');
const Schema = require('mongoose');

const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    groupname: { type: String, required: true },
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    clients: [{
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }]
  })
)

module.exports = Group;