const ObjectId = require('mongoose').Types.ObjectId;
const asyncHandler = require('express-async-handler')
const db = require('../models');
const Rota = db.rota;
const Group = db.group;
const { Employee } = db.employee;

exports.get = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId)

  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }

  const count = await Rota.countDocuments({ _id: { $in: group.rotas }})
  const rotas = await Rota
    .aggregate()
    .match({ _id: { $in: group.rotas }})
    .exec()

  return res.json({ count, rotas })
})

exports.getById = asyncHandler(async (req, res) => {
  const { rotaId } = req.params;

  const rota = await Rota.findById(rotaId)

  if (!rota) {
    res.status(400)
    throw new Error('Rota doesn\'t exist')
  }

  const employees = await Employee.find({ _id: { $in: rota.employeeIds }})

  return res.json({ ...rota, employees })
})

exports.addRota = asyncHandler(async (req, res) => {
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
  await Group.findByIdAndUpdate(groupId, { $push: { rotas: new ObjectId(rota._id)}})

  return res.status(201).json(rota)
})

exports.updateRota = asyncHandler(async (req, res) => {
  const { rotaId } = req.params;

  const rota = await Rota.findByIdAndUpdate(rotaId, { 
    ...req.body,
    audit: {
      updateBy: req.auth._id
    } 
  })

  return res.json(rota)
})

exports.deleteRota = asyncHandler(async (req, res) => {
  const { groupId, rotaId } = req.params;

  // Soft delete the rota, remove it from the group
  await Group.findByIdAndUpdate(groupId, { $pull: { rotas: rotaId }})

  return res.json({ message: 'Deleted rota' })
})