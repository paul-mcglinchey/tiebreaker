const application     = require('../controllers/application.controller.js');
const middleware      = require('../middlewares');

const router    = require('express').Router();

// Get all applications
router.get(
  '/',
  application.get
);

// Create a new application
router.post(
  '/',
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.validationMiddleware.checkRequestHasBody,
  application.create
);

// Update a application
router.put(
  '/:applicationId',
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.applicationMiddleware.checkIfQueryHasApplicationId,
  middleware.applicationMiddleware.checkIfApplicationExists,
  middleware.validationMiddleware.checkRequestHasBody,
  application.update
)

// Delete a group
router.delete(
  '/:applicationId',
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.applicationMiddleware.checkIfQueryHasApplicationId,
  middleware.applicationMiddleware.checkIfApplicationExists,
  application.delete
);

module.exports = router