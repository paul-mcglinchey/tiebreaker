const { Schema }  = require('mongoose');
const mongoose    = require('mongoose');

const { ActivityLogSchema }       = require('./activitylog.model');
const { AuditSchema }             = require('./common/audit.schema');

const { NameSchema, AddressSchema, ContactInfoSchema } = require('./common/demographics.schema');

const Client = mongoose.model(
  "Client",
  new Schema({
    name: NameSchema,
    address: AddressSchema,
    birthdate: Date,
    contactInfo: ContactInfoSchema,
    sessions: [{
      type: Schema.Types.ObjectId,
      ref: 'Session'
    }],
    colour: String,
    activityLog: [ActivityLogSchema],
    audit: AuditSchema,
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    },
    deleted: {
      type: Boolean,
      default: false
    }
  }, { timestamps: true })
);

module.exports = Client;