const ObjectId        = require('mongoose').Types.ObjectId;
const asyncHandler    = require('express-async-handler')
const db              = require('../models');
const Group           = db.group;
const Employee        = db.employee;

// Read operations

// Retrieve all employees that the currently logged in user has view access to
exports.getEmployees = asyncHandler(async (req, res) => {
  const { groupId } = req.params
  const group = await Group.findById(groupId)

  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }

  const query = { $or: [{ _id: { $in: group.entities.employees }}, { _id: { $in: group.deletedEntities.employees }}]}
  const count = await Employee.countDocuments(query)
  const employees = await Employee
    .aggregate()
    .match(query)
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
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  });

  if (!employee) {
    throw new Error('Problem occurred creating employee')
  }

  // Add the employee to the rota group
  await Group.findByIdAndUpdate(groupId, { $push: { 'entities.employees': new ObjectId(employee._id )}, audit: { updatedBy: req.auth._id }})

  res.status(201).json(employee)
})

exports.deleteEmployee = asyncHandler(async (req, res) => {
  // Get the employee ID from the query params
  const { employeeId, groupId } = req.params;

  // Do a soft delete of the employee (mark as deleted and move it from the group entities to deletedEntities)
  const employee = await Employee.findByIdAndUpdate(employeeId, { deleted: true, audit: { updatedBy: req.auth._id } })

  if (!employee) throw new Error('A problem occurred deleting the employee')

  await Group.findByIdAndUpdate(groupId, { $pull: { 'entities.employees': employee._id }, $push: { 'deletedEntities.employees': employee._id }})

  res.json(employeeId)
})