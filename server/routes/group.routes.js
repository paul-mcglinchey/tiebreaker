module.exports = app => {
  const group = require('../controllers/group.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all groups that the user belongs to
  router.get('/', group.getGroups);

  // CUD Operations, need a request body
  router.use(middleware.validation.validateRequest);

  // Create a new group
  router.post('/', middleware.createGroup.checkIfGroupExists, group.createGroup);

  app.use('/api/groups', router);
}