const asyncHandler    = require('express-async-handler')
const db              = require('../models')
const Permission      = db.permission

exports.get = asyncHandler(async (req, res) => {
  const count = await Permission.countDocuments()
  const permissions = await Permission.find()

  return res.json({ count, permissions })
})

exports.create = asyncHandler(async (req, res) => {
  const permission = await Permission.create({
    ...req.body,
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  })

  if (!permission) throw new Error('Problem occurred creating permission')

  return res.status(201).json(permission)
})

exports.update = asyncHandler(async (req, res) => {
  const { permissionId } = req.params

  const permission = await Permission.findByIdAndUpdate(permissionId, {
    ...req.body,
    audit: {
      updatedBy: req.auth._id
    }
  })

  if (!permission) throw new Error('Problem occurred updating permission')

  return res.json(permission)
})

exports.delete = asyncHandler(async (req, res) => {
  const { permissionId } = req.params

  const permission = await Permission.findByIdAndDelete(permissionId)

  if (!permission) throw new Error('Problem occurred deleting permission')

  return res.json({ _id: permission._id, message: 'Deleted permission' })
})

exports.createPermissions = asyncHandler(async () => {
  const permissions = [
    { name: 'view', description: 'Grants view access to a resource' },
    { name: 'edit', description: 'Grants edit access to a resource' },
    { name: 'delete', description: 'Grants delete access to a resource' },
  ]

  const existingPermissions = await Permission.find({}, { 'name': 1, 'description': 1, _id: 0})

  const missingPermissions = permissions.filter((p) => existingPermissions.includes(p))

  await Permission.insertMany(missingPermissions)
})