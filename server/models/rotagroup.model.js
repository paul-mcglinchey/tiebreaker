const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const RotaGroup = mongoose.model(
  "RotaGroup",
  new Schema({
    groupName: { type: String, required: true },
    default: { type: Boolean, required: true },
    accessControl: {
      viewers: [String],
      editors: [String],
      owners: [String]
    },
    employees: [String],
    rotas: [String],
    listDefinitions: [String],
    groupColour: { type: String, required: false }
  })
)

module.exports = RotaGroup;