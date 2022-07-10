const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const { AuditSchema } = require('./common/audit.schema')

const Group = mongoose.model(
  "Group",
  new Schema({
    name: { 
      type: String, required: true 
    },
    description: {
      type: String, required: false 
    },
    applications: [Number],
    users: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      permissions: [Number],
      applications: [{
        application: {
          type: Number
        },
        permissions: [Number]
      }]
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