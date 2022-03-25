const mongoose = require('mongoose');
const Schema = require('mongoose');

const ClientGroup = mongoose.model(
  "ClientGroup",
  new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
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
    colour: { type: String, required: false }
  })
)

module.exports = ClientGroup;