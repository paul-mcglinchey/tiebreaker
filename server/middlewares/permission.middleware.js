const asyncHandler    = require('express-async-handler')
const db              = require('../models')
const Permission      = db.permission

const checkIfQueryHasPermissionId = asyncHandler(async (req, res, next) => {
  if (!req.params.permissionId) {
    res.status(400)
    throw new Error('Request requires a permission ID')
  }

  next()
})

const checkIfPermissionExists = asyncHandler(async (req, res, next) => {
  const permission = await Permission.findById(req.params.permissionId)

  if (!permission) {
    res.status(400)
    throw new Error('Permission doesn\'t exist')
  }

  next()
})

const checkIfPermissionNameExists = asyncHandler(async (req, res, next) => {
  const { name } = req.body
  const { permissionId } = req.params

  if (!name) {
    next()
  }

  const permission = await Permission.findOne({ _id: { $ne: permissionId }, name: name })

  if (permission) {
    res.status(400)
    throw new Error('That permission name is already in use')
  }

  next()
})

module.exports = {
  checkIfQueryHasPermissionId,
  checkIfPermissionExists,
  checkIfPermissionNameExists
}