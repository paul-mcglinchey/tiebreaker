module.exports = app => {
  const grouplist = require('../controllers/grouplist.controller.js');

  var router = require('express').Router();

  // Get the default grouplist
  router.get('/default', grouplist.getDefaultLists);
  router.put('/default', grouplist.updateDefaultLists);

  app.use('/api/grouplists', router);
}