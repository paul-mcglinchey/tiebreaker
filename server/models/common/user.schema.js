const { Schema } = require('mongoose');

const UserSchema = new Schema({
  mode: String,
  userId: Number,
  userUuid: String,
  username: String,
  email: String,
  name: String,
  image: String,
  date: Object,
  locked: Boolean,
  isConfirmed: Boolean,
  lastActiveAt: Date,
  createdAt: Date,
  updatedAt: Date,
  tenant: {
    tenantId: String,
    name: String,
    image: String,
    loginRedirectPath: String,
    logoutRedirectPath: String,
  },
  "authorization": {
    [key]: {
      "roles": [String]
    },
    permissions: [Mixed],
    name: String
  },
  tenantId: String,
  uuid: String
}, { timestamps: true });

module.exports = UserSchema;