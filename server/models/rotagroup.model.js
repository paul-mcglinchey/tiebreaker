const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const RotaGroup = mongoose.model(
  "RotaGroup",
  new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    accessControl: {
      viewers: [String],
      editors: [String],
      owners: [String]
    },
    employees: [String],
    rotas: [String],
    listDefinitions: [String],
    colour: { type: String, required: false }
  })
)

module.exports = RotaGroup;