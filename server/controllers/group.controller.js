const asyncHandler = require('express-async-handler')
const ObjectId = require('mongoose').Types.ObjectId
const db = require('../models')

const Group = db.group
const Client = db.client
const Employee = db.employee
const Rota = db.rota
const GroupList = db.grouplist
const Permission = db.permission

// Get all groups
exports.get = asyncHandler(async (req, res) => {

  // the mongoose query to fetch the groups for the current user
  let groupQuery = { 'accessControl.viewers': req.auth.userId }

  const count = await Group.countDocuments(groupQuery)
  const groups = await Group.find(groupQuery)

  return res.status(200).json({
    count: count,
    groups: groups
  })
})

// Create group
exports.create = asyncHandler(async (req, res) => {
  // destructure the body
  const { name, description, colour } = req.body

  // get the ID of the default list set to create the group with
  const defaultListsId = await GroupList.findOne({ default: true }, { _id: 1 })

  // get all permissions
  const permissions = await Permission.find()
  const permissionIds = permissions.map(p => p._id)

  const group = await Group.create({
    name, description, colour,
    listDefinitions: [defaultListsId],
    users: [{
      user: new ObjectId(req.auth.userId),
      permissions: permissionIds
    }]
  })

  return res.status(201).json(group)
})

// Update group
exports.update = asyncHandler(async (req, res) => {
  const { groupId } = req.params

  const group = await Group.findByIdAndUpdate(groupId, req.body)

  return res.status(200).json(group)
})

// Delete group
exports.delete = asyncHandler(async (req, res) => {
  const { groupId } = req.params

  const group = await Group.findById(groupId)

  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }

  await Group.findByIdAndDelete(groupId)

  await Client.deleteMany({ _id: group.clients })
  await Employee.deleteMany({ _id: group.employees })
  await Rota.deleteMany({ _id: group.rotas })

  return res.json({ groupId: group._id, message: 'Deleted group' })
})