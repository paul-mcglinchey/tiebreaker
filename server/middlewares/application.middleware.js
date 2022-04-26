const asyncHandler    = require('express-async-handler')
const db              = require('../models')
const Application     = db.application

const checkIfQueryHasApplicationId = asyncHandler(async (req, res, next) => {
  if (!req.params.applicationId) {
    res.status(400)
    throw new Error('Request requires a application ID')
  }

  next()
})

const checkIfApplicationExists = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.applicationId)

  if (!application) {
    res.status(400)
    throw new Error('Application doesn\'t exist')
  }

  next()
})

const checkIfApplicationNameExists = asyncHandler(async (req, res, next) => {
  const { name } = req.body

  if (!name) {
    next()
  }

  const application = await Application.findOne({ name: name })

  if (application) {
    res.status(400)
    throw new Error('That application name is already in use')
  }

  next()
})

module.exports = {
  checkIfQueryHasApplicationId,
  checkIfApplicationExists,
  checkIfApplicationNameExists
}