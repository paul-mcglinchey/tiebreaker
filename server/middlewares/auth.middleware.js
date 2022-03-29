const secrets = require('../config/auth.config');
const jwt = require('jsonwebtoken');

const publicKey = secrets.publicKey;

// Verifies that every request has an authorized access token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, publicKey, (err, auth) => {
    if (err) return res.sendStatus(403);
    req.auth = auth;

    next();
  });
};

const checkUserHasAdminRole = (req, res, next) => {
  if (req.auth.authorization[req.auth.tenantId].roles.includes('admin')) return next();
  
  // User doesn't have access to this endpoint
  return res.sendStatus(403);
}

const authJwt = {
  verifyToken,
  checkUserHasAdminRole
};

module.exports = authJwt;