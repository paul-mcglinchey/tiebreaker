module.exports = app => {
  const employees = require('../controllers/employee.controller.js');
  
  var router = require('express').Router();

  // Get all rotas which the current user has view access to
  router.get('/', employees.getEmployees);

  // Add a new employee
  router.post('/', employees.addEmployee);

  app.use('/api/employees', router);
}