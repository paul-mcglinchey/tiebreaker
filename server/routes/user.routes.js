module.exports = app => {
  const user = require('../controllers/user.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Create a new client
  router.post('/configureuser', user.configureUser);

  // Create a new group
  router.post('/creategroup', middleware.createGroup.checkIfGroupExists, user.createGroup);

  // Get all groups that the user belongs to
  router.get('/groups', user.getGroups);

  app.use('/api/users', router);
}