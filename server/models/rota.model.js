const { Schema }  = require('mongoose');
const mongoose    = require('mongoose');

const { AuditSchema }           = require('./common/audit.schema');

const Rota = mongoose.model(
  "Rota",
  new Schema({
    name: { 
      type: String, required: true 
    },
    description: { 
      type: String, required: false 
    },
    startDay: { 
      type: String, required: true 
    },
    closingHour: {
      type: Number, required: true
    },
    schedules: [{
      type: Schema.Types.ObjectId, ref: 'Schedule'
    }],
    employees: [{
      type: Schema.Types.ObjectId, ref: 'Employee'
    }],
    locked: { 
      type: Boolean, required: false, default: false 
    },
    colour: { 
      type: String, required: false 
    },
    audit: AuditSchema,
    deleted: { type: Boolean, default: false }
  }, { timestamps: true })
);

module.exports = Rota;