const group           = require('../controllers/group.controller.js');
const user            = require('../controllers/user.controller')
const middleware      = require('../middlewares');

const router    = require('express').Router({ mergeParams: true });

// Get all groups that the user belongs to
router.get(
  '/',
  group.get
);

// Get all users for a group
router.get(
  '/:groupId/users',
  user.getGroupUsers
)

// Create a new group
router.post(
  '/',
  middleware.groupMiddleware.checkIfGroupNameExists,
  middleware.validationMiddleware.checkRequestHasBody,
  group.create
);

// Update a group
router.put(
  '/:groupId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.groupMiddleware.checkIfGroupExists,
  middleware.groupMiddleware.checkAccess(['view', 'edit']),
  middleware.validationMiddleware.checkRequestHasBody,
  group.update
)

// Delete a group
router.delete(
  '/:groupId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.groupMiddleware.checkIfGroupExists,
  group.delete
);

router.use('/:groupId/clients', require('./client.routes'))
router.use('/:groupId/rotas', require('./rota.routes'))
router.use('/:groupId/employees', require('./employee.routes'))
router.use('/:groupId/applications', require('./application.routes'))

module.exports = router