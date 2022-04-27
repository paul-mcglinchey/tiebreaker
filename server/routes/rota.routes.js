const rotas       = require('../controllers/rota.controller.js');
const middleware  = require('../middlewares');

var router = require('express').Router({ mergeParams: true });

// Validate that a group ID has been supplied in the params
router.use(middleware.groupMiddleware.checkIfQueryHasGroupId);

// Get all rotas which the current user has view access to
router.get(
  '/',
  rotas.get
);

// Get rota by ID
router.get(
  '/:rotaId',
  middleware.rotaMiddleware.checkIfQueryHasRotaId,
  rotas.getById
);

// Add a new rota
router.post(
  '/',
  middleware.validationMiddleware.checkRequestHasBody,
  rotas.create
);

// Update a rota
router.put(
  '/:rotaId',
  middleware.rotaMiddleware.checkIfQueryHasRotaId,
  middleware.validationMiddleware.checkRequestHasBody,
  rotas.update
);

// Delete a rota
router.delete(
  '/:rotaId',
  middleware.rotaMiddleware.checkIfQueryHasRotaId,
  rotas.delete
)

router.use('/:rotaId/schedules', require('./schedule.routes'))

module.exports = router