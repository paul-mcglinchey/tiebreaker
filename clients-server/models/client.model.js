const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const SessionSchema = require('./session.model').SessionSchema;
const ActivityLogSchema = require('./activitylog.model').ActivityLogSchema;

const NameSchema = new Schema({
  firstName: { type: String, trim: true, required: true },
  middleNames: { type: [String], required: false },
  lastName: { type: String, trim: true, required: true }
});

const ContactInfoSchema = new Schema({
  primaryPhoneNumber: { type: String, trim: true, required: false },
  primaryEmail: { type: String, trim: true, required: false },
  emails: [{
    name: { type: String, required: false },
    email: { type: String, required: false }
  }],
  phoneNumbers: [{
    name: { type: String, required: false },
    number: { type: Number, required: false }
  }]
});

const AddressSchema = new Schema({
  firstLine: { type: String, trim: true, required: false },
  secondLine: { type: String, trim: true, required: false },
  thirdLine: { type: String, trim: true, required: false },
  city: { type: String, trim: true, required: false },
  country: { type: String, required: false },
  postCode: { type: String, required: false }
});

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