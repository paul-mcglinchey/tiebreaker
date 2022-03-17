const mongoose = require('mongoose');
const Schema = require('mongoose');

const ClientGroup = mongoose.model(
  "ClientGroup",
  new mongoose.Schema({
    groupName: { type: String, required: true },
    accessControl: {
      viewers: [String],
      editors: [String],
      owners: [String]
    },
    clients: [{
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }],
    listDefinitions: [String],
    groupColour: { type: String, required: false }
  })
)

module.exports = ClientGroup;