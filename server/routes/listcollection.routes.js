const grouplist = require('../controllers/listcollection.controller.js');
const middleware = require('../middlewares');

var router = require('express').Router();

// Get the default grouplist
router.get(
  '/system', 
  middleware.authMiddleware.checkUserHasAdminRole, 
  grouplist.getSystem
);

router.post(
  '/system',
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.listcollectionMiddleware.checkIfSystemListCollectionExists,
  grouplist.createSystem
)

router.put(
  '/system/:listcollectionId', 
  middleware.authMiddleware.checkUserHasAdminRole,
  middleware.listcollectionMiddleware.checkQueryHasListCollectionId,
  grouplist.updateSystem
);

module.exports = router