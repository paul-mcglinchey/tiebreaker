module.exports = app => {
  const clients = require('../controllers/client.controller.js');

  var router = require('express').Router();

  // Create a new client
  router.post('/', clients.create);

  // Get all clients
  router.get('/', clients.findAll);

  // Delete a client by id
  router.delete('/deleteclient', clients.deleteClient);

  // Get maximum number of pages of clients
  router.get('/pagesofclients', clients.maxNumberOfPages);

  // Add a session to a client's sessions array
  router.put('/sessions', clients.addSession);

  app.use('/api/clients', router);
}