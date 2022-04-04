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
  router.get(
    '/:clientId',
    middleware.clientMiddleware.checkClientIdExists, 
    clients.getClientById
  );

  // Create a new client
  router.post('/', middleware.validationMiddleware.checkRequestHasBody, clients.create);

  // Update a client
  router.put('/:clientId', clients.updateClient);

  // Update a client's colour
  router.put('/:clientId/colours', clients.updateColour);

  // Add a session to a client
  router.put('/:clientId/sessions', clients.addSession);

  // Delete a client by id
  router.delete(
    '/:clientId',
    middleware.groupMiddleware.checkQueryHasGroupId,
    clients.deleteClient
  );

  app.use('/api/clients', router);
}