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
    middleware.createGroup.checkIfGroupExists,
    middleware.createGroup.checkIfFirstGroup,
    rotagroup.createGroup
  );

  // Delete a rotagroup
  router.delete('/', 
    middleware.createGroup.checkIfGroupExists,
    middleware.createGroup.checkUserAccessToGroup('owner'), 
    rota.deleteGroup
  );

  // Update default rotagroup
  router.put('/default',
    rotagroup.setDefaultGroup,
    middleware.createGroup.checkUserAccessToGroup('editor'), 
    rota.deleteGroup
  );

  app.use('/api/rotagroups', router);
}