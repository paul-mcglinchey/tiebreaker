module.exports = app => {
  const user = require('../controllers/user.controller.js')
  const middleware = require('../middlewares/auth.middleware')

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
  router.use(middleware.protect)

  router.get(
    '/authenticate'
  )

  router.get(
    '/current',
    user.getCurrent
  );

  router.get(
    '/:userId',
    user.getById
  );

  app.use('/api/users', router);
}