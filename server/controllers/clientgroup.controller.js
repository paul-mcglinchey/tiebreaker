const db              = require('../models')
const asyncHandler    = require('express-async-handler')
const groupController = require('./common/group.controller')
const ClientGroup     = db.clientgroup
const Client          = db.client

// Get all client groups
exports.get = groupController.get(ClientGroup)

// Create client group
exports.create = groupController.create(ClientGroup)

// Update client group
exports.update = groupController.update(ClientGroup)

// Delete client group
exports.delete = groupController.delete(ClientGroup, asyncHandler(async (group) => {
  const { clients: clientIds } = group

  await Client.deleteMany({ _id: clientIds })
}))