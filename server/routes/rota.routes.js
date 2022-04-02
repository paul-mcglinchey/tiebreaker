module.exports = app => {
  const rotas = require('../controllers/rota.controller.js');
  const schedules = require('../controllers/schedule.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all rotas which the current user has view access to
  router.get(
    '/', 
    middleware.groupMiddleware.checkQueryHasGroupId, 
    rotas.getRotas
  );

  // Get rota by ID
  router.get(
    '/:rotaId',
    middleware.rotaMiddleware.checkRotaIdExists, 
    rotas.getRotaById
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
    middleware.groupMiddleware.checkQueryHasGroupId,
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

  // Delete a rota
  router.delete(
    '/:rotaId',
    middleware.rotaMiddleware.checkRotaIdExists,
    middleware.rotaMiddleware.checkUserAccessToRota('owners'),
    rotas.deleteRota
  )

  app.use('/api/rotas', router);
}