const listcollection = require('../controllers/listcollection.controller.js');
const middleware = require('../middlewares');

var router = require('express').Router();

// Get the default listcollection
router.get(
  '/system', 
  middleware.authMiddleware.checkUserHasAdminRole, 
  listcollection.getSystem
);

router.post(
  '/system',
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.listcollectionMiddleware.checkIfSystemListCollectionExists,
  listcollection.createSystem
)

router.put(
  '/system/:listcollectionId',
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.listcollectionMiddleware.checkQueryHasListCollectionId,
  listcollection.updateSystem
);

module.exports = router