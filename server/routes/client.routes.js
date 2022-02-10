module.exports = app => {
  const clients = require('../controllers/client.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all clients
  router.get('/', clients.findAll);

  // Get a client by id
  router.get('/:clientId', clients.findById);

  // CUD Operations - Requests should have a body
  router.use(middleware.validation.validateRequest);

  // Create a new client
  router.post('/', middleware.createClient.isGroupNameSet, clients.create);

  // Add a session to a client
  router.put('/:clientId/sessions', clients.addSession);

  // Delete a client by id
  router.delete('/', clients.delete);

  app.use('/api/clients', router);
}