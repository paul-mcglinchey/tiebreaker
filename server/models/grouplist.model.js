const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const GroupList = mongoose.model(
  "GroupList",
  new Schema({
    lists: [{
      name: { type: String, required: true },
      values: [{
        short: String, long: { type: String, required: true }
      }]
    }],
    createdBy: String,
    updatedBy: String,
    systemOwned: Boolean,
  }, { timestamps: true })
);

module.exports = GroupList;