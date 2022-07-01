const asyncHandler        = require('express-async-handler');
const db                  = require('../models');
const Application         = db.application

exports.get = asyncHandler(async (req, res) => {
  const applications = await Application.find()

  return res.json({ applications: applications, count: applications.length })
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
  const application = await Application.findByIdAndUpdate(req.params.applicationId, {
    ...req.body,
    'audit.updatedBy': req.auth._id
  })

  if (!application) throw new Error('Problem occurred updating application')

  return res.json(application)
})

exports.delete = asyncHandler(async (req, res) => {
  const { applicationId } = req.params

  const application = await Application.findByIdAndDelete(applicationId)

  return res.json({ _id: application._id, message: 'Deleted application' })
})