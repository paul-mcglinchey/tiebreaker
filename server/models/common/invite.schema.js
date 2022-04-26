const { Schema } = require('mongoose');
const { AuditSchema } = require('./audit.schema');

const InviteSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  permissions: {
    permissions: [{
      type: Schema.Types.ObjectId,
      ref: 'Permission'
    }],
    rotas: [{
      rotaId: {
        type: Schema.Types.ObjectId,
        ref: 'Rota'
      }
    }]
  },
  audit: AuditSchema
}, { timestamps: true })

module.exports = {
  InviteSchema
}