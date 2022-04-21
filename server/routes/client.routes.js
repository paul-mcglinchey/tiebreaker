const clients     = require('../controllers/client.controller.js');
const middleware  = require('../middlewares');

var router = require('express').Router({ mergeParams: true });

// Get all clients
router.get(
  '/',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
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
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.validationMiddleware.checkRequestHasBody,
  clients.create
);

// Update a client
router.put(
  '/:clientId', 
  clients.update
);

// Add a session to a client
router.put(
  '/:clientId/sessions', 
  clients.addSession
);

// Delete a client by id
router.delete(
  '/:clientId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  clients.delete
);

module.exports = router