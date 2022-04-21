const clientGroup = require('../controllers/clientgroup.controller.js');
const middleware = require('../middlewares');
const db = require('../models');
const ClientGroup = db.clientgroup;

var router = require('express').Router({ mergeParams: true });

// Get all groups that the user belongs to
router.get('/', clientGroup.get);

// Create a new clientGroup
router.post(
  '/',
  middleware.groupMiddleware.checkIfGroupNameExists(ClientGroup),
  middleware.validationMiddleware.checkRequestHasBody,
  clientGroup.create
);

// Update a group
router.put(
  '/:groupId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.groupMiddleware.checkIfGroupNameExists(ClientGroup),
  middleware.groupMiddleware.checkIfGroupExists(ClientGroup),
  middleware.validationMiddleware.checkRequestHasBody,
  middleware.groupMiddleware.checkAccess(ClientGroup, 'editors'),
  clientGroup.update
)

// Delete a clientGroup
router.delete(
  '/:groupId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.groupMiddleware.checkIfGroupExists(ClientGroup),
  middleware.groupMiddleware.checkAccess(ClientGroup, 'owners'),
  clientGroup.delete
);

router.use('/:groupId/clients', require('./client.routes'))

module.exports = router