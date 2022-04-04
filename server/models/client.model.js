const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const { SessionSchema } = require('./session.model');
const { ActivityLogSchema } = require('./activitylog.model');
const {
  NameSchema, AddressSchema, ContactInfoSchema
} = require('./common/demographics.schema');

const Client = mongoose.model(
  "Client",
  new Schema({
    accessControl: {
      viewers: [ String ],
      editors: [ String ],
      owners: [ String ],
    },
    name: NameSchema,
    address: AddressSchema,
    birthdate: Date,
    contactInfo: ContactInfoSchema,
    sessions: [SessionSchema],
    clientColour: String,
    activityLog: [ActivityLogSchema],
    createdBy: {
      userUuid: String,
      username: String,
    },
    updatedBy: {
      userUuid: String,
      username: String
    },
  }, { timestamps: true })
);

module.exports = Client;