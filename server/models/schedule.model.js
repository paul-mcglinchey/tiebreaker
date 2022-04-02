const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ScheduleSchema = new Schema({
  startDate: { type: Date, required: true },
  employees: [{
    employee: { 
      type: Schema.Types.ObjectId,
      ref: 'Employee'
    },
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