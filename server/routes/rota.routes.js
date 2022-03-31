module.exports = app => {
  const rotas = require('../controllers/rota.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all rotas which the current user has view access to
  router.get('/', rotas.getRotas);

  // Get rota by ID
  router.get(
    '/:rotaId',
    middleware.rotaMiddleware.checkRotaIdExists, 
    rotas.getRotaById
  );

  // CUD Operations - Requests should have a body
  router.use(middleware.validationMiddleware.checkRequestHasBody);

  // Add a new rota
  router.post('/', middleware.groupMiddleware.checkBodyHasGroupId, rotas.addRota);

  // Update a rota
  router.put(
    '/:rotaId',
    middleware.rotaMiddleware.checkRotaIdExists, 
    rotas.updateRota
  );

  app.use('/api/rotas', router);
}