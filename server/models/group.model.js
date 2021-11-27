const mongoose = require('mongoose');
const Schema = require('mongoose');

const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    groupname: { type: String, required: true },
    users: [Schema.Types.ObjectId],
    clients: [Schema.Types.ObjectId]
  })
)

module.exports = Group;