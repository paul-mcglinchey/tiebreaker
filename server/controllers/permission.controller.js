const asyncHandler    = require('express-async-handler')
const db              = require('../models')
const Permission      = db.permission

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