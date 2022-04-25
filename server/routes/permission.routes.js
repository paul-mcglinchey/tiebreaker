const permission = require('../controllers/permission.controller.js');
const middleware = require('../middlewares');

var router = require('express').Router();

// Get the default permission
router.get(
  '/', 
  permission.get
);

router.post(
  '/',
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.permissionMiddleware.checkIfPermissionNameExists,
  permission.create
)

router.put(
  '/:permissionId', 
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.permissionMiddleware.checkIfQueryHasPermissionId,
  middleware.permissionMiddleware.checkIfPermissionExists,
  middleware.permissionMiddleware.checkIfPermissionNameExists,
  permission.update
);

router.delete(
  '/:permissionId',
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.permissionMiddleware.checkIfQueryHasPermissionId,
  middleware.permissionMiddleware.checkIfPermissionExists,
  permission.delete
)

module.exports = router