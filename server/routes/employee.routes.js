const employees = require('../controllers/employee.controller.js');
const middleware = require('../middlewares');

var router = require('express').Router({ mergeParams: true });

router.use(middleware.groupMiddleware.checkIfQueryHasGroupId)

// Get all employees which the current user has view access to for a specific group
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
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.employeeMiddleware.checkIfQueryHasEmployeeId,
  middleware.employeeMiddleware.checkIfEmployeeExists,
  employees.deleteEmployee
)

module.exports = router