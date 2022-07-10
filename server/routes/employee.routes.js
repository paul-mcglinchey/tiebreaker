const employees = require('../controllers/employee.controller.js');
const middleware = require('../middlewares');

var router = require('express').Router({ mergeParams: true });

router.use(middleware.groupMiddleware.checkIfQueryHasGroupId)

// Get all employees which the current user has view access to for a specific group
router.get(
  '/',
  employees.get
)

// Add a new employee
router.post(
  '/',
  employees.create
)

// Update an employee
router.put(
  '/:employeeId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.employeeMiddleware.checkIfQueryHasEmployeeId,
  middleware.employeeMiddleware.checkIfEmployeeExists,
  employees.update
)

// Delete an employee (soft)
router.delete(
  '/:employeeId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  middleware.employeeMiddleware.checkIfQueryHasEmployeeId,
  middleware.employeeMiddleware.checkIfEmployeeExists,
  employees.delete
)

module.exports = router