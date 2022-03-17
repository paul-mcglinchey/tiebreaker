const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.client = require('./client.model.js');
db.clientgroup = require('./clientgroup.model.js');
db.session = require('./session.model.js').Session;
db.activitylog = require('./activitylog.model.js').ActivityLog;
db.grouplist = require('./grouplist.model');
db.employee = require('./employee.model');
db.rota = require('./rota.model');
db.rotagroup = require('./rotagroup.model');
db.grouplist = require('./grouplist.model');

module.exports = db;