const { Schema } = require('mongoose');

const NameSchema = new Schema({
  firstName: { type: String, trim: true, required: true },
  middleNames: { type: String, required: false },
  lastName: { type: String, trim: true, required: true }
});

const ContactInfoSchema = new Schema({
  primaryPhoneNumber: { type: String, trim: true, required: false },
  primaryEmail: { type: String, trim: true, required: true },
  emails: [{
    name: { type: String, required: true },
    email: { type: String, required: true }
  }],
  phoneNumbers: [{
    name: { type: String, required: true },
    number: { type: Number, required: true }
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

module.exports = {
  NameSchema, ContactInfoSchema, AddressSchema
}