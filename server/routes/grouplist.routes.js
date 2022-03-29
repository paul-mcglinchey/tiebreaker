module.exports = app => {
  const grouplist = require('../controllers/grouplist.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get the default grouplist
  router.get('/default', middleware.authMiddleware.checkUserHasAdminRole, grouplist.getDefaultLists);
  router.put('/default', middleware.authMiddleware.checkUserHasAdminRole, grouplist.updateDefaultLists);

  app.use('/api/grouplists', router);
}