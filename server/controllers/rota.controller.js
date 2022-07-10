const ObjectId = require('mongoose').Types.ObjectId;
const asyncHandler = require('express-async-handler')
const db = require('../models');
const Rota = db.rota;
const Group = db.group;
const Employee = db.employee;

exports.get = asyncHandler(async (req, res) => {
  const query = { groupId: new ObjectId(req.params.groupId), deleted: false }
  const count = await Rota.countDocuments(query)
  const rotas = await Rota.find(query)

  return res.json({ count, rotas })
})

exports.create = asyncHandler(async (req, res) => {
  // create a new rota instance
  const rota = await Rota.create({
    ...req.body,
    groupId: req.params.groupId,
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  })

  if (!rota) throw new Error('Problem occurred creating rota')

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
  // Soft delete the rota
  const rota = await Rota.findByIdAndUpdate(req.params.rotaId, { deleted: true, 'audit.updatedBy': req.auth._id })

  return res.json({ _id: rota._id, message: 'Deleted rota' })
})