module.exports = app => {
  const clientGroup = require('../controllers/clientgroup.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all groups that the user belongs to
  router.get('/', clientGroup.getClientGroups);
  
  // Get current default group
  router.get('/default', clientGroup.getDefaultClientGroup);

  // CUD Operations, need a request body
  router.use(middleware.validation.validateRequest);

  // Create a new clientGroup
  router.post(
    '/', 
    middleware.createGroup.checkIfClientGroupExists,
    middleware.createGroup.checkIfFirstGroup, 
    clientGroup.createClientGroup
  );

  // Delete a clientGroup
  router.delete('/', middleware.createGroup.checkIfClientGroupExists, clientGroup.deleteClientGroup);

  // Update default clientGroup
  router.put('/default', clientGroup.setDefaultClientGroup);

  app.use('/api/clientgroups', router);
}