module.exports = app => {
  const rotagroup = require('../controllers/rotagroup.controller.js');
  const middleware = require('../middlewares');
  const db = require('../models');
  const RotaGroup = db.rotagroup;
  var router = require('express').Router();

  // Get all groups that the user belongs to
  router.get('/', rotagroup.getRotaGroups);
  
  // CUD Operations, need a request body
  router.use(middleware.validationMiddleware.checkRequestHasBody);

  // Create a new rotagroup
  router.post(
    '/', 
    middleware.groupMiddleware.checkIfGroupExists(RotaGroup),
    rotagroup.createRotaGroup
  );

  // PUT Endpoints will require editor access
  router.use(middleware.groupMiddleware.checkUserAccessToGroup(RotaGroup, 'editors'));
  
  // Update a group
  router.put(
    '/',
    middleware.groupMiddleware.checkIfGroupExists(RotaGroup),
    middleware.groupMiddleware.checkIfGroupNameExists(RotaGroup),
    rotagroup.updateRotaGroup
  )

  // DELETE Endpoints will require owner access
  router.use(middleware.groupMiddleware.checkUserAccessToGroup(RotaGroup, 'owners'));

  // Delete a rotagroup
  router.delete('/',
    middleware.groupMiddleware.checkIfGroupExists(RotaGroup),
    middleware.groupMiddleware.checkIfGroupNameExists(RotaGroup),
    rotagroup.deleteRotaGroup
  );

  app.use('/api/rotagroups', router);
}