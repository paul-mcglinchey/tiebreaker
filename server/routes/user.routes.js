module.exports = app => {
  const user = require('../controllers/user.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all groups that the user belongs to
  router.get('/groups', user.getGroups);

  // CUD Operations, need a request body
  router.use(middleware.validation.validateRequest);

  // Create a new client
  router.post('/configureuser', user.configureUser);

  // Create a new group
  router.post('/creategroup', middleware.createGroup.checkIfGroupExists, user.createGroup);

  app.use('/api/users', router);
}