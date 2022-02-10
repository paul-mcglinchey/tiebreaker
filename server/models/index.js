const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.client = require('./client.model.js');
db.group = require('./group.model.js');
db.session = require('./session.model.js').Session;

module.exports = db;