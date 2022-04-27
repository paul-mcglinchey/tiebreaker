const schedules   = require('../controllers/schedule.controller.js');
const middleware  = require('../middlewares');

var router = require('express').Router({ mergeParams: true });

// Validate that a group ID has been supplied in the params
router.use(middleware.rotaMiddleware.checkIfQueryHasRotaId);

// Get all schdules for the current rota
router.get(
  '/',
  schedules.get
);

// Add a new schedule
router.post(
  '/',
  middleware.validationMiddleware.checkRequestHasBody,
  schedules.create
)

// Update a schedule belonging to a rota
router.put(
  '/:scheduleId',
  middleware.scheduleMiddleware.checkIfQueryHasScheduleId,
  schedules.update
)

module.exports = router