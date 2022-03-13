const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.rota = require('./rota.model.js');
db.employee = require('./employee.model').Employee;

module.exports = db;