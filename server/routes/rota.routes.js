module.exports = app => {
  const rotas = require('../controllers/rota.controller.js');
  
  var router = require('express').Router();

  // Get all rotas which the current user has view access to
  router.get('/', rotas.getRotas);

  // Add a new rota
  router.post('/', rotas.addRota);

  app.use('/api/rotas', router);
}