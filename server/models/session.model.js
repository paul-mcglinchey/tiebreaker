const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { AuditSchema } = require('./common/audit.schema');

const SessionSchema = new Schema({
  title: { 
    type: String, required: true 
  },
  description: { 
    type: String, required: false 
  },
  tags: { 
    type: [String], required: false, default: [] 
  },
  date: { 
    type: Date 
  },
  audit: AuditSchema
}, { timestamps: true });

const Session = mongoose.model(
  "Session", SessionSchema
);

module.exports = { SessionSchema, Session };