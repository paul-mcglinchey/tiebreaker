const db = require('../models');
const secrets = require('../config/auth.config');
const User = db.user;

const jwt = require('jsonwebtoken');

const publicKey = secrets.secret;

verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, publicKey, (err, auth) => {
    if (err) return res.sendStatus(403);
    req.auth = auth;

    next();
  });
};

// Userfront user has a userId, this is mapped to an ObjectId in the mongo db
// We want to use the ObjectId so here we're adding the corresponding ObjectId to
// the request body
getUserId = (req, res, next) => {
  User.findOne({ userId: req.auth.userId })
    .then(user => {
      if (user) {
        req.body.uid = user._id;
        next();
      } else {
        res.status(500).send({
          mesage:
            `Could not find a user with id ${req.auth.userId}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while trying to find the user with id ${req.auth.userId}.`
      })
    });
}

const authJwt = {
  verifyToken,
  getUserId
};

module.exports = authJwt;