const authMiddleware = require('./auth.middleware');
const clientMiddleware = require('./client.middleware');
const groupMiddleware = require('./group.middleware');
const validationMiddleware = require('./validation.middleware');
const rotaMiddleware = require('./rota.middleware');
const scheduleMiddleware = require('./schedule.middleware');
const employeeMiddleware = require('./employee.middleware');
const errorMiddleware = require('./error.middleware');
const listcollectionMiddleware = require('./listcollection.middleware')

module.exports = {
  authMiddleware,
  clientMiddleware,
  groupMiddleware,
  validationMiddleware,
  rotaMiddleware,
  scheduleMiddleware,
  employeeMiddleware,
  errorMiddleware,
  listcollectionMiddleware
};