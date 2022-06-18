const asyncHandler = require('express-async-handler')
const ObjectId = require('mongoose').Types.ObjectId
const db = require('../models')

const Group = db.group
const Client = db.client
const Employee = db.employee
const Rota = db.rota
const ListCollection = db.listcollection

// Get all groups
exports.get = asyncHandler(async (req, res) => {
  // the mongoose query to fetch the groups for the current user
  const groupQuery = { "users.user": new ObjectId(req.auth._id) }

  const count = await Group.countDocuments(groupQuery)
  const groups = await Group.find(groupQuery)

  return res.status(200).json({
    count: count,
    groups: groups
  })
})

// Create group
exports.create = asyncHandler(async (req, res) => {
  // get the ID of the default list set to create the group with
  const systemListCollectionId = await ListCollection.findOne({ default: true }, { _id: 1 })

  const group = await Group.create({
    ...req.body,
    users: [{
      user: req.auth._id,
      applications: []
    }],
    listcollections: [systemListCollectionId],
    audit: { createdBy: req.auth._id, updatedBy: req.auth._id }
  })

  return res.status(201).json(group)
})

// Update group
exports.update = asyncHandler(async (req, res) => {
  const group = await Group.findByIdAndUpdate(req.params.groupId, {
    ...req.body,
    'audit.updateBy': req.auth._id
  })

  return res.status(200).json(group)
})

// Delete group
exports.delete = asyncHandler(async (req, res) => {
  const group = await Group.findByIdAndDelete(req.params.groupId)

  await Client.deleteMany({ _id: group.clients })
  await Employee.deleteMany({ _id: group.employees })
  await Rota.deleteMany({ _id: group.rotas })

  return res.json({ _id: group._id, message: 'Deleted group' })
})