const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.client = require('./client.model.js');
db.group = require('./group.model.js');

module.exports = db;