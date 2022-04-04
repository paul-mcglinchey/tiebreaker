const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { EmployeeSchema } = require('./employee.model');

const ScheduleSchema = new Schema({
  accessControl: {
    viewers: [ String ],
    editors: [ String ],
    owners: [ String ],
  },
  startDate: { type: Date, required: true },
  employeeSchedules: [{
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee'
    },
    employee: EmployeeSchema,
    shifts: [{
      date: { type: Date, required: true },
      startHour: { type: Number, required: true },
      endHour: { type: String, required: true },
      notes: String,
      isSick: { type: Boolean, required: false, default: false },
      onHoliday: { type: Boolean, required: false, default: false }
    }]
  }],
  createdBy: String,
  updatedBy: String
}, { timestamps: true })

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;