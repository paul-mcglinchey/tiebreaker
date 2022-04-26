const user = require('../controllers/user.controller.js')
const middleware = require('../middlewares')

var router = require('express').Router();

router.post(
  '/signup',
  user.signup
)

router.post(
  '/login',
  user.login
)

// Add auth protection to routes after this point
router.use(middleware.authMiddleware.protect)

router.get(
  '/authenticate',
  user.authenticate
)

router.get(
  '/current',
  user.getCurrent
);

router.get(
  '/:userId',
  user.getById
);

router.get(
  '/:groupId',
  middleware.groupMiddleware.checkIfQueryHasGroupId,
  user.getGroupUsers
)

module.exports = router