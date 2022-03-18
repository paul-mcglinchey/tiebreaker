const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const {
  NameSchema, AddressSchema, ContactInfoSchema
} = require('./common/demographics.schema');

const EmployeeSchema = new Schema({
  accessControl: {
    viewers: [ String ],
    editors: [ String ],
    owners: [ String ],
  },
  role: { type: String, required: false },
  department: { type: String, required: false },
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