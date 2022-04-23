const asyncHandler = require('express-async-handler')
const db = require('../models')
const Group = db.group

const checkAccess = (accessRequired) => {
  return asyncHandler(async (req, res, next) => {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      res.status(404)
      throw new Error('Resource not found.')
    }

    if (!group.accessControl) {
      res.status(401)
      throw new Error('Unauthorized.')
    }

    if (!group.accessControl[accessRequired].includes(req.auth.userId)) {
      res.status(403)
      throw new Error('Forbidden.')
    }

    next()
  })
}

const checkIfQueryHasGroupId = asyncHandler(async (req, res, next) => {
  const { groupId } = req.params;

  if (!groupId) {
    res.status(400)
    throw new Error('Request requires a group ID.')
  }

  next()
})

// This middleware can be used to check if the name of a group has been used already or not
const checkIfGroupNameExists = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) next();
  
  const group = await Group.findOne({ name: name });
  
  if (group) {
    res.status(400)
    throw new Error('That group name is already in use.')
  }

  next();
})

const checkIfGroupExists = asyncHandler(async (req, res, next) => {
  // check that the group exists
  const group = Group.findById(req.params.groupId);

  if (!group) {
    res.status(404)
    throw new Error('Resource not found.')
  }

  next()
})

const groupMiddleware = {
  checkAccess,
  checkIfQueryHasGroupId,
  checkIfGroupNameExists,
  checkIfGroupExists
};

module.exports = groupMiddleware;