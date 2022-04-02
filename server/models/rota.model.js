const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { EmployeeSchema } = require('./employee.model');

const Rota = mongoose.model(
  "Rota",
  new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    accessControl: {
      viewers: [ String ],
      editors: [ String ],
      owners: [ String ],
    },
    startDay: { 
      type: String,
      required: true 
    },
    closingHour: {
      type: Number,
      required: true
    },
    schedules: [{
      type: Schema.Types.ObjectId,
      ref: 'Schedule'
    }],
    employeeIds: [String],
    employees: { type: [EmployeeSchema], required: false, default: [] },
    locked: { type: Boolean, required: false, default: false },
    createdBy: String,
    updatedBy: String,
    colour: { type: String, required: false }
  }, { timestamps: true })
);

module.exports = Rota;