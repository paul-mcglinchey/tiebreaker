const { Schema }  = require('mongoose');
const mongoose    = require('mongoose');

const { AuditSchema }             = require('./common/audit.schema');

const Application = mongoose.model(
  "Application",
  new Schema({
    identifier: {
      type: String, required: true, unique: true
    },
    name: {
      type: String, required: true, unique: true
    },
    description: {
      type: String, required: false
    },
    icon: {
      type: String, required: false
    },
    url: {
      type: String, required: true
    },
    requiredPermissions: [String],
    audit: AuditSchema
  }, { timestamps: true })
);

module.exports = Application;