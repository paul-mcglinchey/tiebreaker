const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const { UsersSchema } = require('./common/groupentity.schema');
const { AuditSchema } = require('./common/audit.schema');
const GroupEntitySchema = require('./common/groupentity.schema');

const Group = mongoose.model(
  "Group",
  new Schema({
    name: { 
      type: String, required: true 
    },
    description: {
      type: String, required: false 
    },
    users: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      applications: [{
        application: {
          type: Schema.Types.ObjectId,
          ref: 'Application'
        },
        permissions: [{
          type: Schema.Types.ObjectId,
          ref: 'Permission'
        }]
      }]
    }],
    entities: GroupEntitySchema,
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