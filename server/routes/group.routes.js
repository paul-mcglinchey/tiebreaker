module.exports = app => {
  const group = require('../controllers/group.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all groups that the user belongs to
  router.get('/', group.getGroups);
  
  // Get a count of the number of groups the user belongs to
  router.get('/count', group.getCount);
  
  // CUD Operations, need a request body
  router.use(middleware.validation.validateRequest);

  // Create a new group
  router.post(
    '/', 
    middleware.createGroup.checkIfGroupExists,
    middleware.createGroup.checkIfFirstGroup, 
    group.createGroup
  );

  // Delete a group
  router.delete('/', middleware.createGroup.checkIfGroupExists, group.deleteGroup);

  // Update default group
  router.put('/default', group.setDefaultGroup);

  app.use('/api/groups', router);
}