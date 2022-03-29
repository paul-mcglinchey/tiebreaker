const authMiddleware = require('./auth.middleware');
const groupMiddleware = require('./group.middleware');
const clientMiddleware = require('./client.middleware');
const validationMiddleware = require('./validation.middleware');

module.exports = {
  authMiddleware,
  groupMiddleware,
  clientMiddleware,
  validationMiddleware
};