const mongoose = require('mongoose');
const Schema = require('mongoose');

const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    groupname: { type: String, required: true },
    default: { type: Boolean, required: true },
    users: [String],
    clients: [{
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }]
  })
)

module.exports = Group;