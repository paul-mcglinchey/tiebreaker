const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const { UsersSchema } = require('./common/users.schema');
const { AuditSchema } = require('./common/audit.schema');

const Group = mongoose.model(
  "Group",
  new Schema({
    name: { 
      type: String, required: true 
    },
    description: {
      type: String, required: false 
    },
    applications: [{
      type: Schema.Types.ObjectId,
      ref: 'Application'
    }],
    clients: [{
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }],
    employees: [{
      type: Schema.Types.ObjectId,
      ref: 'Employee'
    }],
    rotas: [{
      type: Schema.Types.ObjectId,
      ref: 'Rota'
    }],
    listcollections: [{
      type: Schema.Types.ObjectId,
      ref: 'ListCollection'
    }],
    colour: { 
      type: String, required: false 
    },
    audit: AuditSchema
  }, { timestamps: true })
)

module.exports = Group;