module.exports = app => {
  const clients = require('../controllers/client.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get maximum number of pages of clients
  router.get('/pagesofclients', clients.maxNumberOfPages);

  // Get all clients
  router.get('/', clients.findAll);

  // CUD Operations - Requests should have a body
  router.use(middleware.validation.validateRequest);

  // Create a new client
  router.post('/', middleware.createClient.isGroupNameSet, clients.create);

  // Delete a client by id
  router.delete('/', clients.delete);

  // Add a session to a client's sessions array
  router.put('/sessions', clients.addSession);

  app.use('/api/clients', router);
}