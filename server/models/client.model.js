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
    clientName: NameSchema,
    address: AddressSchema,
    birthdate: { type: Date, required: true },
    contactInfo: ContactInfoSchema,
    sessions: [SessionSchema],
    clientColour: String,
    activityLog: [ActivityLogSchema],
    createdBy: String,
    updatedBy: String
  }, { timestamps: true })
);

module.exports = Client;