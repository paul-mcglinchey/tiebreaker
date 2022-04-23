const { Schema }  = require('mongoose');
const mongoose    = require('mongoose');

const { AuditSchema }           = require('./common/audit.schema');
const { UsersSchema }           = require('./common/users.schema');
const { EmployeeSchema }        = require('./employee.model');

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
    employeeIds: [{
      type: Schema.Types.ObjectId, ref: 'Employee'
    }],
    employees: { 
      type: [EmployeeSchema], required: false, default: [] 
    },
    locked: { 
      type: Boolean, required: false, default: false 
    },
    colour: { 
      type: String, required: false 
    },
    users: [UsersSchema],
    audit: AuditSchema
  }, { timestamps: true })
);

module.exports = Rota;