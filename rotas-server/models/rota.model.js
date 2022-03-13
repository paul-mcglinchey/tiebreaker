const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { EmployeeSchema } = require('./employee.model');

const Rota = mongoose.model(
  "Rota",
  new Schema({
    accessControl: {
      viewers: [ String ],
      editors: [ String ],
      owners: [ String ],
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    schedule: [
      {
        employee: { type: EmployeeSchema, required: true },
        shifts: [
          {
            date: { type: Date, required: true },
            startTime: { type: Number, required: true },
            endTime: { type: Number, required: true }
          }
        ]
      }
    ],
    rotaType: {
      type: String,
      enum: ['FOH', 'BOH'],
      default: 'FOH'
    },
    locked: { type: Boolean, required: false, default: false },
    createdBy: String,
    updatedBy: String
  }, { timestamps: true })
);

module.exports = Rota;