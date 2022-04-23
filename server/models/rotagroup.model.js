const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const { UsersSchema } = require('./common/users.schema');
const { AuditSchema } = require('./common/audit.schema');

const RotaGroup = mongoose.model(
  "RotaGroup",
  new Schema({
    name: { 
      type: String, required: true 
    },
    description: {
      type: String, required: false 
    },
    employees: [{
      type: Schema.Types.ObjectId,
      ref: 'Employee'
    }],
    rotas: [{
      type: Schema.Types.ObjectId,
      ref: 'Rota'
    }],
    listDefinitions: [{
      type: Schema.Types.ObjectId,
      ref: 'GroupList'
    }],
    colour: { 
      type: String, required: false 
    },
    users: [UsersSchema],
    audit: AuditSchema
  }, { timestamps: true })
)

module.exports = RotaGroup;