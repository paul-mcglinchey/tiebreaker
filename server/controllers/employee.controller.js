const ObjectId = require('mongoose').Types.ObjectId;
const asyncHandler = require('express-async-handler')
const db = require('../models');
const Employee = db.employee;

// Read operations

// Retrieve all employees that the currently logged in user has view access to
exports.get = asyncHandler(async (req, res) => {
  const query = { groupId: new ObjectId(req.params.groupId), deleted: false }
  const count = await Employee.countDocuments(query)
  const employees = await Employee.find(query)

  res.json({ count, employees })
})

exports.create = asyncHandler(async (req, res) => {
  // Create a new employee
  const employee = await Employee.create({
    ...req.body,
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  });

  if (!employee) {
    throw new Error('Problem occurred creating employee')
  }

  res.status(201).json(employee)
})

// Update an employee
exports.update = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.employeeId, {
    ...req.body,
    'audit.updatedBy': req.auth._id
  });

  return res.status(200).json(employee);
})

exports.delete = asyncHandler(async (req, res) => {
  // Get the employee ID from the query params
  const { employeeId } = req.params;

  // Soft delete the employee
  const employee = await Employee.findByIdAndUpdate(employeeId, { deleted: true, 'audit.updatedBy': req.auth._id })

  res.json({ _id: employee._id, message: 'Deleted client' })
})