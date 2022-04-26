const { Schema }  = require('mongoose');
const mongoose    = require('mongoose');

const { AuditSchema }             = require('./common/audit.schema');

const Application = mongoose.model(
  "Application",
  new Schema({
    name: {
      type: String, required: true
    },
    description: {
      type: String, required: false
    },
    icon: {
      type: String, required: false
    },
    audit: AuditSchema
  }, { timestamps: true })
);

module.exports = Application;