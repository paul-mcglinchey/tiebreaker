module.exports = app => {
  const clients = require('../controllers/client.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all clients
  router.get(
    '/',
    middleware.groupMiddleware.checkQueryHasGroupId, 
    clients.get
  );

  // Get a client by id
  router.get(
    '/:clientId',
    middleware.clientMiddleware.checkClientIdExists, 
    clients.getById
  );

  // Create a new client
  router.post(
    '/', 
    middleware.validationMiddleware.checkRequestHasBody, 
    clients.create
  );

  // Update a client
  router.put('/:clientId', clients.update);

  // Add a session to a client
  router.put('/:clientId/sessions', clients.addSession);

  // Delete a client by id
  router.delete(
    '/:clientId',
    middleware.groupMiddleware.checkQueryHasGroupId,
    clients.delete
  );

  app.use('/api/clients', router);
}