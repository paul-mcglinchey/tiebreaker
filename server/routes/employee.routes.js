module.exports = app => {
  const employees = require('../controllers/employee.controller.js');
  const middleware = require('../middlewares');
  const RotaGroup = require('../models').rotagroup;

  var router = require('express').Router();

  // Get all employees which the current user has view access to for a specific rotagroup
  router.get(
    '/',
    middleware.groupMiddleware.checkQueryHasGroupId,
    employees.getEmployees
  );

  // Add a new employee
  router.post(
    '/',
    middleware.groupMiddleware.checkQueryHasGroupId, 
    employees.addEmployee
  );

  // Delete an employee (soft)
  router.delete(
    '/:employeeId',
    middleware.groupMiddleware.checkUserAccessToGroup(RotaGroup, 'owners'),
    employees.deleteEmployee
  )

  app.use('/api/employees', router);
}