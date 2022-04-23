const mongoose      = require('mongoose')

const permissionSchema = mongoose.Schema({
  name: { 
    type: String, required: true, unique: true 
  },
  description: { 
    type: String, required: true 
  },
  language: { 
    type: String, required: true, default: 'en-US' 
  }
}, { timeStamps: true });

module.exports = mongoose.model('Permission', permissionSchema);