const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const { ActivityLogSchema } = require('./activitylog.model');
const { AuditSchema } = require('./common/audit.schema');

const { NameSchema, AddressSchema, ContactInfoSchema } = require('./common/demographics.schema');

const Employee = mongoose.model(
  'Employee', 
  new Schema({
    role: { type: String, required: false },
    department: { type: String, required: false },
    reportsTo: { type: String, required: false },
    name: { type: NameSchema, required: true },
    address: AddressSchema,
    contactInfo: { type: ContactInfoSchema, required: true },
    birthdate: { type: Date, required: false },
    startDate: { type: Date, required: false },
    minHours: { type: Number, required: false },
    maxHours: { type: Number, required: false },
    unavailableDays: [{ type: String, required: false }],
    holidays: [{
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      isPaid: { type: Boolean, required: false, default: true }
    }],
    colour: String,
    isActive: { type: Boolean, default: true },
    activityLog: [ActivityLogSchema],
    audit: AuditSchema,
    deleted: { type: Boolean, default: false }
  }, { timestamps: true })
);

module.exports = Employee