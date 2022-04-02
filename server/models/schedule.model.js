const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { EmployeeSchema } = require('./employee.model');

const ScheduleSchema = new Schema({
  startDate: { type: Date, required: true },
  employeeSchedules: [{
    employee: EmployeeSchema,
    shifts: [{
      date: { type: Date, required: true },
      startHour: { type: Number, required: true },
      endHour: { type: String, required: true },
      notes: String
    }]
  }],
  createdBy: String,
  updatedBy: String
}, { timestamps: true })

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;