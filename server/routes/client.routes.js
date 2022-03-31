module.exports = app => {
  const clients = require('../controllers/client.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all clients
  router.get(
    '/',
    middleware.groupMiddleware.checkQueryHasGroupId, 
    clients.getClients
  );

  // Get a client by id
  router.get('/:clientId', clients.getClientById);

  // CUD Operations - Requests should have a body
  router.use(middleware.validationMiddleware.checkRequestHasBody);

  // Create a new client
  router.post('/', middleware.groupMiddleware.checkBodyHasGroupId, clients.create);

  // Update a client
  router.put('/:clientId', clients.updateClient);

  // Update a client's colour
  router.put('/:clientId/colours', clients.updateColour);

  // Add a session to a client
  router.put('/:clientId/sessions', clients.addSession);

  // Delete a client by id
  router.delete('/', clients.delete);

  app.use('/api/clients', router);
}