const rotagroup       = require('../controllers/rotagroup.controller.js');
const middleware      = require('../middlewares');

const db        = require('../models');
const RotaGroup = db.rotagroup;
const router    = require('express').Router({ mergeParams: true });

// Get all groups that the user belongs to
router.get('/', rotagroup.get);

// Create a new rotagroup
router.post(
  '/',
  middleware.groupMiddleware.checkIfGroupNameExists(RotaGroup, false),
  middleware.validationMiddleware.checkRequestHasBody,
  rotagroup.create
);

// Update a group
router.put(
  '/:groupId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.groupMiddleware.checkIfGroupExists(RotaGroup),
  middleware.validationMiddleware.checkRequestHasBody,
  rotagroup.update
)

// Delete a rotagroup
router.delete(
  '/:groupId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.groupMiddleware.checkIfGroupExists(RotaGroup),
  middleware.groupMiddleware.checkAccess(RotaGroup, 'owners'),
  rotagroup.delete
);

router.use('/:groupId/rotas', require('./rota.routes'));

module.exports = router