const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const { AuditSchema } = require('./common/audit.schema');

const Schedule = mongoose.model(
  'Schedule',
  new Schema({
    startDate: { 
      type: Date, required: true 
    },
    employeeSchedules: [{
      employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
      },
      shifts: [{
        date: { type: Date, required: true },
        startHour: { type: String },
        endHour: { type: String },
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
)

module.exports = Schedule;