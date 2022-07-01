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
    applications: [String],
    users: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      permissions: [String],
      applications: [{
        application: {
          type: String
        },
        permissions: [String]
      }]
    }],
    entities: {
      type: GroupEntitySchema,
      required: true
    },
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