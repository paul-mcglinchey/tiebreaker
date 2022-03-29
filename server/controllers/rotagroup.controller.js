const db = require('../models');
const groupController = require('./common/group.controller');
const RotaGroup = db.rotagroup;
const Employee = db.employee.Employee;

// Get all rota groups
exports.getRotaGroups = groupController.getGroups(RotaGroup);

// Create rota group
exports.createRotaGroup = groupController.createGroup((defaultListsId, req) => {
  return new RotaGroup({
    name: req.body.name,
    description: req.body.description,
    accessControl: {
      viewers: [req.auth.userUuid],
      editors: [req.auth.userUuid],
      owners: [req.auth.userUuid]
    },
    listDefinitions: [defaultListsId],
    colour: req.body.colour
  })
});

// Update rota group
exports.updateRotaGroup = groupController.updateGroup(RotaGroup);

// Delete rota group
exports.deleteRotaGroup = groupController.deleteGroup(RotaGroup, (group, req, res) => {
  var employeeIds = group.employees;
  var _id = group._id;

  Employee.deleteMany({ _id: employeeIds })
    .then(() => {
      RotaGroup.updateOne({ _id: _id, 'accessControl.owners': req.auth.userUuid }, { employees: [] })
        .catch(err => {
          return res.status(500).send({
            message: err.message || `Could not update the group with id ${_id}.`
          });
        })
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || `Could not delete clients from ${_id}.`
      })
    });
});