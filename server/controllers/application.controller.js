const asyncHandler        = require('express-async-handler');
const db                  = require('../models');
const Application         = db.application

exports.get = asyncHandler(async (req, res) => {
  const applications = await Application.find()

  return res.json(applications)
})

exports.create = asyncHandler(async (req, res) => {
  const application = await Application.create({
    ...req.body,
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  })

  if (!application) throw new Error('Problem occurred creating application')

  return res.status(201).json(application)
})

exports.update = asyncHandler(async (req, res) => {
  const { applicationId } = req.params

  const updateBody = req.body
  updateBody.audit.updatedBy = req.auth._id

  const application = Application.findByIdAndUpdate(applicationId, updateBody)

  return res.json(application)
})

exports.delete = asyncHandler(async (req, res) => {
  const { applicationId } = req.params

  const application = await Application.findByIdAndDelete(applicationId)

  return res.json({ _id: application._id, message: 'Deleted application' })
})