const { Schema } = require('mongoose');
const mongoose = require('mongoose');

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

const EmployeeSchema = new Schema({
  accessControl: {
    viewers: [ String ],
    editors: [ String ],
    owners: [ String ],
  },
  role: { type: String, required: true },
  department: { type: String, required: true },
  reportsTo: { type: String, required: false },
  name: NameSchema,
  address: AddressSchema,
  contactInfo: ContactInfoSchema,
  birthdate: { type: Date, required: false },
  startDate: { type: Date, required: false },
  minHours: { type: Number, required: false },
  maxHours: { type: Number, required: false },
  unavailableDays: [
    { type: String, required: false }
  ],
  holidays: [
    {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      isPaid: { type: Boolean, required: false, default: true }
    }
  ],
  createdBy: String,
  updatedBy: String,
  employeeColour: String
}, { timestamps: true });

const Employee = mongoose.model(
  "Employee", EmployeeSchema
)

module.exports = {
  Employee,
  EmployeeSchema
};