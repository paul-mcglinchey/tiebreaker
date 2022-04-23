const mongoose  = require('mongoose');
const Schema    = require('mongoose');

const { AuditSchema }           = require('./common/audit.schema');
const { UsersSchema }           = require('./common/users.schema');

const ClientGroup = mongoose.model(
  "ClientGroup",
  new mongoose.Schema({
    name: { 
      type: String, required: true 
    },
    description: { 
      type: String, required: false 
    },
    clients: [{
      type: Schema.Types.ObjectId,
      ref: 'Client'
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

module.exports = ClientGroup;