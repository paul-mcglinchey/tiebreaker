const { Schema } = require('mongoose');

const AuditSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = {
  AuditSchema
}