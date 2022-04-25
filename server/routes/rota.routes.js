const rotas       = require('../controllers/rota.controller.js');
const schedules   = require('../controllers/schedule.controller.js');
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
  middleware.rotaMiddleware.checkRotaIdExists,
  rotas.getById
);

// Gets all schedules for a rota
router.get(
  '/:rotaId/schedules/:startDate',
  middleware.rotaMiddleware.checkRotaIdExists,
  middleware.scheduleMiddleware.checkQueryHasDate,
  schedules.getScheduleByDate
);

// Add a new rota
router.post(
  '/',
  middleware.validationMiddleware.checkRequestHasBody,
  rotas.addRota
);

// Add a new schedule
router.post(
  '/:rotaId/schedules',
  middleware.rotaMiddleware.checkRotaIdExists,
  middleware.validationMiddleware.checkRequestHasBody,
  schedules.addSchedule
)

// Update a rota
router.put(
  '/:rotaId',
  middleware.rotaMiddleware.checkRotaIdExists,
  middleware.validationMiddleware.checkRequestHasBody,
  rotas.updateRota
);

// Update a schedule belonging to a rota
router.put(
  '/:rotaId/schedules/:startDate',
  middleware.rotaMiddleware.checkRotaIdExists,
  middleware.scheduleMiddleware.checkQueryHasDate,
  schedules.updateSchedule
)

// Delete a rota
router.delete(
  '/:rotaId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.rotaMiddleware.checkRotaIdExists,
  rotas.deleteRota
)

module.exports = router