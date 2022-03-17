module.exports = app => {
  const rotagroup = require('../controllers/rotagroup.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all groups that the user belongs to
  router.get('/', rotagroup.getRotaGroups);
  
  // CUD Operations, need a request body
  router.use(middleware.validation.validateRequest);

  // Create a new rotagroup
  router.post(
    '/', 
    middleware.createGroup.checkIfRotaGroupExists,
    middleware.createGroup.checkIfFirstGroup,
    rotagroup.createRotaGroup
  );

  // Delete a rotagroup
  router.delete('/', 
    middleware.createGroup.checkIfRotaGroupExists,
    middleware.createGroup.checkUserAccessToGroup('owner'), 
    rotagroup.deleteRotaGroup
  );

  app.use('/api/rotagroups', router);
}