const asyncHandler = require('express-async-handler')
const db = require('../models');
const ListCollection = db.listcollection;

exports.createSystem = asyncHandler(async (req, res) => {
  const { lists } = req.body

  const listcollection = await ListCollection.create({
    lists,
    system: true,
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  })

  if (!listcollection) throw new Error('A problem occurred creating list collection')

  return res.status(201).json(listcollection)
})

exports.getSystem = asyncHandler(async (req, res) => {
  const systemListCollection = await ListCollection.findOne({ system: true })

  return res.json(systemListCollection)
})

exports.updateSystem = asyncHandler(async (req, res) => {
  const listcollection = await ListCollection.findByIdAndUpdate(req.params.listcollectionId, {
    ...req.body,
    'audit.updateBy': req.auth._id
  })

  return res.json(listcollection)
})