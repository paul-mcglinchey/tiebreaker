module.exports = app => {
  const user = require('../services/user.service.js');

  var router = require('express').Router();

  // Get the current user
  router.get('/current', user.getCurrentUser);

  // Get a specific user
  router.get('/:userId', user.getUserById);

  app.use('/api/users', router);
}