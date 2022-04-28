const clients     = require('../controllers/client.controller.js');
const middleware  = require('../middlewares');

var router = require('express').Router({ mergeParams: true });

router.use(middleware.groupMiddleware.checkIfQueryHasGroupId)

// Get all clients
router.get(
  '/',
  clients.get(false)
);

// Get all clients including deleted clients
router.get(
  '/deleted',
  clients.get(true)
)

// Get a client by id
router.get(
  '/:clientId',
  middleware.clientMiddleware.checkIfQueryHasClientId,
  clients.getById
);

// Create a new client
router.post(
  '/',
  middleware.validationMiddleware.checkRequestHasBody,
  clients.create
);

// Update a client
router.put(
  '/:clientId',
  middleware.clientMiddleware.checkIfQueryHasClientId,
  clients.update
);

// Add a session to a client
router.put(
  '/:clientId/sessions',
  middleware.clientMiddleware.checkIfQueryHasClientId,
  clients.addSession
);

// Delete a client by id
router.delete(
  '/:clientId',
  middleware.clientMiddleware.checkIfQueryHasClientId,
  clients.delete
);

module.exports = router