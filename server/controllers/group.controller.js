const asyncHandler = require('express-async-handler')
const ObjectId = require('mongoose').Types.ObjectId
const db = require('../models')

const Group = db.group
const Client = db.client
const Employee = db.employee.Employee
const Rota = db.rota
const ListCollection = db.listcollection

// Get all groups
exports.get = asyncHandler(async (req, res) => {

  // the mongoose query to fetch the groups for the current user
  const groupQuery = { users: new ObjectId(req.auth._id) }

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
  const systemListCollectionId = await ListCollection.findOne({ default: true }, { _id: 1 })

  const group = await Group.create({
    name, description, colour,
    users: [req.auth._id],
    listcollections: [systemListCollectionId],
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

  return res.json({ _id: group._id, message: 'Deleted group' })
})