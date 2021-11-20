module.exports = app => {
  const clients = require('../controllers/client.controller.js');

  var router = require('express').Router();

  // Create a new client
  router.post('/', clients.create);

  // Get all clients
  router.get('/', clients.findAll);

  // Get maximum number of pages of clients
  router.get('/pagesofclients', clients.maxNumberOfPages);

  app.use('/api/clients', router);
}