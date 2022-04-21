module.exports = app => {
  const employees = require('../controllers/employee.controller.js');
  const middleware = require('../middlewares');

  var router = require('express').Router();

  // Get all employees which the current user has view access to for a specific rotagroup
  router.get(
    '/',
    employees.getEmployees
  );

  // Add a new employee
  router.post(
    '/',
    employees.addEmployee
  );

  // Delete an employee (soft)
  router.delete(
    '/:employeeId',
    middleware.employeeMiddleware.checkUserAccessToGroup('owners'),
    employees.deleteEmployee
  )

  app.use('/api/employees', router);
}