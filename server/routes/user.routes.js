module.exports = app => {
  const user = require('../controllers/user.controller.js');

  var router = require('express').Router();

  // Get the current user
  router.get('/current', user.getCurrentUser);

  // update the default group
  router.put('/:grouptype/default', user.updateDefaultGroup)

  app.use('/api/users', router);
}