const ObjectId        = require('mongoose').Types.ObjectId;
const asyncHandler    = require('express-async-handler')
const db              = require('../models');
const Group       = db.group;
const Rota            = db.rota;
const { Employee }    = db.employee;

// Read operations

// Retrieve all employees that the currently logged in user has view access to
exports.getEmployees = asyncHandler(async (req, res) => {
  const { groupId } = req.params

  const group = await Group.findById(groupId)

  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }

  const count = await Employee.countDocuments({ _id: { $in: group.employees }})
  const employees = await Employee
    .aggregate()
    .match({ _id: { $in: group.employees }})
    .addFields({ fullName: { $concat: ['$name.firstName', ' ', '$name.lastName'] } })
    .exec()

  res.json({ count, employees })
})

exports.addEmployee = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = Group.findById(groupId)

  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }

  // Create a new employee
  const employee = await Employee.create({
    ...req.body,
    audit: {
      createdBy: req.auth.userId,
      updatedBy: req.auth.userId
    }
  });

  if (!employee) {
    throw new Error('Problem occurred creating employee')
  }

  // Add the employee to the rota group
  await Group.findByIdAndUpdate(groupId, { $push: { employees: new ObjectId(employee._id )}})

  res.status(201).json(employee)
})

exports.deleteEmployee = asyncHandler(async (req, res) => {
  // Get the employee ID from the query params
  const { employeeId, groupId } = req.params;

  // Do a soft delete of the employee i.e remove it from the group it belongs to and any rotas which it's included in
  // This way a history can be maintained within the schedules
  await Group.findByIdAndUpdate(groupId, { $pull: { employees: employeeId }})
  
  res.json(employeeId)
})