const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const GroupList = mongoose.model(
  "GroupList",
  new Schema({
    lists: [{
      name: { type: String, required: true },
      values: [{
        short: String, 
        long: { type: String, required: true }, 
        colour: { type: String, required: true }
      }]
    }],
    createdBy: String,
    updatedBy: String,
    default: { type: Boolean, required: false, default: false }
  }, { timestamps: true })
);

module.exports = GroupList;