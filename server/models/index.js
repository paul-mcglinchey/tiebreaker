const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = `${dbConfig.url}/clientbase`;
db.clients = require('./client.model.js')(mongoose);

module.exports = db;