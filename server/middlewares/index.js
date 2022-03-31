const authMiddleware = require('./auth.middleware');
const groupMiddleware = require('./group.middleware');
const validationMiddleware = require('./validation.middleware');
const rotaMiddleware = require('./rota.middleware');

module.exports = {
  authMiddleware,
  groupMiddleware,
  validationMiddleware,
  rotaMiddleware
};