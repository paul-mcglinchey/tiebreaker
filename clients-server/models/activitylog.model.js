const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ActivityLogSchema = new Schema({
  task: { type: String, required: true },
  supplementary: {},
  actor: String
}, { timestamps: true });

const ActivityLog = mongoose.model(
  "ActivityLog", ActivityLogSchema
);

module.exports = { ActivityLogSchema, ActivityLog };