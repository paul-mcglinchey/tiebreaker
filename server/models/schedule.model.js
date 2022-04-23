const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const { AuditSchema } = require('./common/audit.schema');
const { EmployeeSchema } = require('./employee.model');

const ScheduleSchema = new Schema({
  startDate: { 
    type: Date, required: true 
  },
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
  locked: { 
    type: Boolean, default: false 
  },
  audit: AuditSchema
}, { timestamps: true })

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;