const mongoose      = require('mongoose');
const { AuditSchema } = require('./common/audit.schema');
const { InviteSchema } = require('./common/invite.schema');
const Schema        = mongoose.Schema

const userSchema = mongoose.Schema({
  username: { 
    type: String, required: true, unique: true 
  },
  email: { 
    type: String, required: true, unique: true 
  },
  password: { 
    type: String, required: true 
  },
  isAdmin: {
    type: Boolean, default: false
  },
  permissions: [{
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    },
    permissions: [{
      type: Schema.Types.ObjectId,
      ref: 'Permission'
    }],
    rotas: {
      rotaId: {
        type: Schema.Types.ObjectId,
        ref: 'Rota'
      },
      permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Permission'
      }]
    }
  }],
  invites: [InviteSchema],
  preferences: {
    defaultGroup: { type: String, required: false }
  }
}, { timeStamps: true });

module.exports = mongoose.model('User', userSchema);