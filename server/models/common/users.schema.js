const { Schema } = require('mongoose');

const UsersSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  }]
}, { timestamps: true })

module.exports = {
  UsersSchema
}