const authMiddleware = require('./auth.middleware');
const groupMiddleware = require('./group.middleware');
const validationMiddleware = require('./validation.middleware');
const rotaMiddleware = require('./rota.middleware');
const scheduleMiddleware = require('./schedule.middleware');

module.exports = {
  authMiddleware,
  groupMiddleware,
  validationMiddleware,
  rotaMiddleware,
  scheduleMiddleware
};