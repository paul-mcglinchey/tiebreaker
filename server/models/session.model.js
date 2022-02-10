const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const SessionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  tags: { type: [String], required: false },
  sessionDate: { type: Date },
  createdBy: {
    uuid: { type: String },
    name: { type: String }
  },
  updatedBy: {
    uuid: { type: String },
    name: { type: String }
  }
}, { timestamps: true });

const Session = mongoose.model(
  "Session", SessionSchema
);

module.exports = { SessionSchema, Session };