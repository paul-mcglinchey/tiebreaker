const { Schema }  = require('mongoose');
const mongoose    = require('mongoose');

const { AuditSchema } = require('./common/audit.schema');

const ListCollection = mongoose.model(
  "ListCollection",
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
    system: { type: Boolean, required: false, default: false }
  }, { timestamps: true })
);

module.exports = ListCollection;