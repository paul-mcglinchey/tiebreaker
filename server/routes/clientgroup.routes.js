module.exports = app => {
  const clientGroup = require('../controllers/clientgroup.controller.js');
  const middleware = require('../middlewares');
  const db = require('../models');
  const ClientGroup = db.clientgroup;

  var router = require('express').Router();

  // Get all groups that the user belongs to
  router.get('/', clientGroup.getClientGroups);

  // CUD Operations, need a request body
  router.use(middleware.validationMiddleware.checkRequestHasBody);

  // Create a new clientGroup
  router.post(
    '/',
    middleware.groupMiddleware.checkIfGroupNameExists(ClientGroup),
    clientGroup.createClientGroup
  );

  // PUT endpoints will require editor access
  router.use(middleware.groupMiddleware.checkUserAccessToGroup(ClientGroup, 'editors'));

  // Update a group
  router.put(
    '/',
    middleware.groupMiddleware.checkIfGroupExists(ClientGroup),
    clientGroup.updateClientGroup
  )

  // DELETE endpoints will require owner access
  router.use(middleware.groupMiddleware.checkUserAccessToGroup(ClientGroup, 'owners'));

  // Delete a clientGroup
  router.delete(
    '/',
    middleware.groupMiddleware.checkIfGroupExists(ClientGroup),
    clientGroup.deleteClientGroup
  );

  app.use('/api/clientgroups', router);
}