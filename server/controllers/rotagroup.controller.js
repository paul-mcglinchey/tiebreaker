const db              = require('../models')
const asyncHandler    = require('express-async-handler')
const groupController = require('./common/group.controller')
const RotaGroup       = db.rotagroup
const Employee        = db.employee.Employee
const Rota            = db.rota

// Get all rota groups
exports.get = groupController.get(RotaGroup)

// Create rota group
exports.create = groupController.create(RotaGroup)

// Update rota group
exports.update = groupController.update(RotaGroup)

// Delete rota group
exports.delete = groupController.delete(RotaGroup, asyncHandler(async (group) => {
  const { rotas: rotaIds, employees: employeeIds } = group

  await Rota.deleteMany({ _id: rotaIds })
  await Employee.deleteMany({ _id: employeeIds })
}))