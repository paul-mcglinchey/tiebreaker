const { Schema }  = require('mongoose');
const mongoose    = require('mongoose');

const { AuditSchema } = require('./common/audit.schema');

const GroupList = mongoose.model(
  "GroupList",
  new Schema({
    lists: [{
      name: { type: String, required: true },
      description: { type: String, required: true },
      values: [{
        short: String, 
        long: { type: String, required: true }, 
        colour: { type: String, required: true }
      }]
    }],
    audit: AuditSchema,
    default: { type: Boolean, required: false, default: false }
  }, { timestamps: true })
);

module.exports = GroupList;