const asyncHandler      = require('express-async-handler')
const db                = require('../models')
const RotaGroup         = db.rotagroup
const { Employee }      = db.employee

const checkUserAccessToGroup = (accessRequired) => {
  return (req, res, next) => {

    const { groupId } = req.body;

    RotaGroup.findById(groupId)
      .then((data) => {
        if (data.accessControl) {
          if (data.accessControl[accessRequired].includes(req.auth.userId)) {
            next();
          } else {
            return res.status(403).send({
              message: `User with ID ${req.auth.userId} not properly authorized to perform that action on group with ID ${groupId}`
            });
          }
        }
      })
      .catch(err => {
        return res.status(500).send({ message: err | `An unexpected error occurred while checking user access` });
      })
  }
}

const checkIfQueryHasEmployeeId = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  if (!employeeId) {
    res.status(400)
    throw new Error('Request requires an employee ID')
  }

  next()
})

const checkIfEmployeeExists = asyncHandler(async (req, res, next) => {
  // check that the group exists
  const employee = Employee.findById(req.params.employeeId);

  if (!employee) {
    res.status(404)
    throw new Error('Employee not found')
  }

  next()
})

const employeeMiddleware = {
  checkUserAccessToGroup,
  checkIfQueryHasEmployeeId,
  checkIfEmployeeExists
}

module.exports = employeeMiddleware;