const ObjectId = require('mongoose').Types.ObjectId;
const asyncHandler = require('express-async-handler')
const db = require('../models');
const Rota = db.rota;
const Group = db.group;
const Employee = db.employee;

exports.get = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.groupId)

  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }

  const query = { _id: { $in: group.entities.rotas }}
  const count = await Rota.countDocuments(query)
  const rotas = await Rota
    .aggregate()
    .match(query)
    .exec()

  return res.json({ count, rotas })
})

exports.getById = asyncHandler(async (req, res) => {
  const rota = await Rota.findById(req.params.rotaId)

  if (!rota) {
    res.status(400)
    throw new Error('Rota doesn\'t exist')
  }

  const employees = await Employee.find({ _id: { $in: rota.entities.employees }})

  return res.json({ ...rota, employees })
})

exports.create = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  // create a new rota instance
  const rota = await Rota.create({
    ...req.body,
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  })

  if (!rota) throw new Error('Problem occurred creating rota')

  // Update the group
  await Group.findByIdAndUpdate(groupId, { $push: { 'entities.rotas': new ObjectId(rota._id)}, audit: { updatedBy: req.auth._id }})

  return res.status(201).json(rota)
})

exports.update = asyncHandler(async (req, res) => {
  const { rotaId } = req.params;

  const rota = await Rota.findByIdAndUpdate(rotaId, { 
    ...req.body,
    'audit.updatedBy': req.auth._id
  })

  return res.json(rota)
})

exports.delete = asyncHandler(async (req, res) => {
  const { groupId, rotaId } = req.params;

  // Do a soft delete of the employee (mark as deleted and move it from the group entities to deletedEntities)
  const rota = await Rota.findByIdAndUpdate(rotaId, { deleted: true, audit: { updatedBy: req.auth._id } })

  if (!rota) throw new Error('A problem occurred deleting the rota')

  await Group.findByIdAndUpdate(groupId, { $pull: { 'entities.rotas': rota._id }, $push: { 'deletedEntities.rotas': rota._id }})

  return res.json({ _id: rota._id, message: 'Deleted rota' })
})