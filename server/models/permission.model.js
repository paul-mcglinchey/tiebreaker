const mongoose      = require('mongoose');
const { AuditSchema } = require('./common/audit.schema');

const permissionSchema = mongoose.Schema({
  identifier: {
    type: Number, required: true, unique: true
  },
  name: { 
    type: String, required: true, unique: true 
  },
  description: { 
    type: String, required: true 
  },
  language: { 
    type: String, required: true, default: 'en-US' 
  },
  type: {
    type: String, enum: ['Group', 'Application']
  },
  audit: AuditSchema
}, { timeStamps: true });

module.exports = mongoose.model('Permission', permissionSchema);