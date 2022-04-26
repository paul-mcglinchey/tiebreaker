const asyncHandler    = require('express-async-handler')
const db              = require('../models')
const ListCollection  = db.listcollection

const checkQueryHasListCollectionId = asyncHandler(async (req, res, next) => {
  if (!req.params.listcollectionId) {
    res.status(400)
    throw new Error('Request requires a list collection ID')
  }

  next()
})

const checkIfSystemListCollectionExists = asyncHandler(async (req, res, next) => {
  const systemListCollection = await ListCollection.findOne({ system: true })

  if (systemListCollection) {
    res.status(400)
    throw new Error('System list collection already exists')
  }

  next()
})

module.exports = {
  checkQueryHasListCollectionId,
  checkIfSystemListCollectionExists
}