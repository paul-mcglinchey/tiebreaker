const asyncHandler  = require('express-async-handler')
const secrets       = require('../config/auth.config')
const jwt           = require('jsonwebtoken')

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token =
    authHeader && 
    authHeader.startsWith("Bearer") && 
    authHeader.split(" ")[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, auth) => {
    if (err) return res.sendStatus(403)
    req.auth = auth

    next()
  })
})

const checkUserHasAdminRole = (req, res, next) => {
  if (req.auth.authorization[req.auth.tenantId].roles.includes('admin')) return next();
  
  // User doesn't have access to this endpoint
  return res.sendStatus(403);
}

const authJwt = {
  protect,
  checkUserHasAdminRole
};

module.exports = authJwt;