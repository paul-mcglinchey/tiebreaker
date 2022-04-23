const asyncHandler  = require('express-async-handler')
const jwt           = require('jsonwebtoken')
const db            = require('../models')
const User          = db.user

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token =
    authHeader && 
    authHeader.startsWith("Bearer") && 
    authHeader.split(" ")[1]

  if (!token) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.auth = await User.findById(decoded.id).select('-password')

    if (!req.auth) {
      res.status(401)
      throw new Error('User not found')
    }
    
    next()
  } catch (err) {
    throw new Error(err)
  }
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