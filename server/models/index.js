const mongoose    = require('mongoose')
mongoose.Promise  = global.Promise

const db    = {}
db.mongoose = mongoose

db.group          = require('./group.model')
db.client         = require('./client.model')
db.session        = require('./session.model').Session
db.activitylog    = require('./activitylog.model').ActivityLog
db.employee       = require('./employee.model')
db.rota           = require('./rota.model')
db.listcollection = require('./listcollection.model')
db.schedule       = require('./schedule.model')
db.user           = require('./user.model')
db.permission     = require('./permission.model')
db.application    = require('./application.model')

module.exports = db