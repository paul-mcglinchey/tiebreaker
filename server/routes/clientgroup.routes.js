module.exports = app => {
  const clientGroup = require('../controllers/clientgroup.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all groups that the user belongs to
  router.get('/', clientGroup.getClientGroups);

  // CUD Operations, need a request body
  router.use(middleware.validation.validateRequest);

  // Create a new clientGroup
  router.post(
    '/', 
    middleware.createGroup.checkIfClientGroupExists,
    clientGroup.createClientGroup
  );

  // DELETE and PUT endpoints will require an ID
  router.use(middleware.createGroup.checkRequestHasId);

  // Delete a clientGroup
  router.delete(
    '/', 
    middleware.createGroup.checkIfClientGroupExists,
    middleware.createGroup.checkUserAccessToClientGroup('owners'),
    clientGroup.deleteClientGroup
  );

  app.use('/api/clientgroups', router);
}