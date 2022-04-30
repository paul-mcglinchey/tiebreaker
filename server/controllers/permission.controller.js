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
  const permission = await Permission.findByIdAndUpdate(req.params.permissionId, {
    ...req.body,
    'audit.updatedBy': req.auth._id
  })

  if (!permission) throw new Error('Problem occurred updating permission')

  return res.json(permission)
})

exports.delete = asyncHandler(async (req, res) => {
  const permission = await Permission.findByIdAndDelete(req.params.permissionId)

  if (!permission) throw new Error('Problem occurred deleting permission')

  return res.json({ _id: permission._id, message: 'Deleted permission' })
})