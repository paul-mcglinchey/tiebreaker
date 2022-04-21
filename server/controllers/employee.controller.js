const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const RotaGroup = db.rotagroup;
const Rota = db.rota;
const { Employee } = db.employee;

// Read operations

// Retrieve all employees that the currently logged in user has view access to
exports.getEmployees = async (req, res) => {

  // Get the groupId from the query
  let { groupId } = await req.query;

  RotaGroup.findOne({ _id: groupId, 'accessControl.viewers': req.auth.userId })
    .then(async (group) => {

      // all the employees that belong to the requested group
      let employeeIds = group.employees;

      // the mongoose query to fetch the employees
      let employeeQuery = { _id: { $in: employeeIds } };

      const employeeCount = await Employee
        .countDocuments(employeeQuery)
        .then(employeeCount => employeeCount)
        .catch(err => { 
          return res.status(500).send({
            message: err.message || `A problem occurred fetching the number of employees which user with ID ${req.auth.userId} has view access to.`
          })
        });

      // create the aggregate object
      const aggregate = Employee.aggregate();
    
      // apply a match operator to the aggregate
      await aggregate
        .match(employeeQuery)
        .addFields({ fullName: { $concat: ['$name.firstName', ' ', '$name.lastName'] } });
    
      // build the query and execute the aggregator
      const employees = await aggregate
        .then(employees => employees)
        .catch(err => {
          return res.status(500).send({
            message: err.message || `A problem occurred fetching the employees which user with ID ${req.auth.userId} has view access to.`
          })
        });
      

      return res.status(200).send({
        count: employeeCount,
        employees: employees
      })
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || `A problem occurred finding group with ID ${groupId}.`
      });
    });
}

exports.addEmployee = async (req, res) => {

  const { groupId } = req.query;

  const {
    role, reportsTo,
    name, address, contactInfo, birthdate,
    startDate, minHours, maxHours, unavailableDays, holidays,
    employeeColour
  } = req.body;

  // Create a new employee
  const employee = new Employee({
    accessControl: {
      viewers: [req.auth.userId], editors: [req.auth.userId], owners: [req.auth.userId]
    },
    role: role || '',
    reportsTo: reportsTo || '',
    name: {
      firstName: name.firstName,
      lastName: name.lastName,
      middleNames: name.middleNames && name.middleNames.split(" ")
    },
    address: {
      firstLine: address?.addressLineOne,
      secondLine: address?.addressLineTwo,
      thirdLine: address?.addressLineThree,
      city: address?.city,
      country: address?.country,
      postCode: address?.postCode
    },
    birthdate: birthdate,
    contactInfo: {
      primaryEmail: contactInfo.primaryEmail,
      primaryPhoneNumber: contactInfo.primaryPhoneNumber,
      emails: contactInfo.emails,
      phoneNumbers: contactInfo.phoneNumbers
    },
    startDate: startDate,
    minHours: minHours,
    maxHours: maxHours,
    unavailableDays: unavailableDays,
    holidays: holidays,
    createdBy: req.auth.userId,
    updatedBy: req.auth.userId,
    employeeColour: employeeColour
  });

  // Save employee in the database
  employee
    .save(employee)
    .then(employee => {
      // Add the employee to the group which was selected
      RotaGroup.updateOne({
        _id: groupId,
        $or: [{ 'accessControl.editors': req.auth.userId }, { 'accessControl.owners': req.auth.userId }]
      }, {
        $push: { employees: new ObjectId(employee._id) }
      })
        .then(() => {
          return res.status(200).send({
            success: `Employee added successfully in group with ID ${groupId}.`
          });
        })
        .catch(err => {
          return res.status(500).send({
            message:
              err.message || `Could not add employee to group with ID ${groupId}.`
          });
        });
    })
    .catch(err => {
      return res.status(500).send({
        message: 
          err.message || `Some error occurred while adding new employee.`
      });
    });
}

exports.deleteEmployee = async (req, res) => {
  // Get the employee ID from the query params
  const { employeeId } = req.params;

  // Get the groupId from the body
  const { groupId } = req.body;

  // Do a soft delete of the employee i.e remove it from the group it belongs to and any rotas which it's included in
  // This way a history can be maintained within the schedules
  RotaGroup.findByIdAndUpdate(groupId, { $pull: { employees: employeeId }})
    .then(rotagroup => {

      let rotaIds = rotagroup.rotas;

      Rota.updateMany({ _id: { $in: rotaIds }}, { $pull: { employeeIds: employeeId }})
        .then(rotas => {
          return res.status(200).send({ message: `Successfully deleted employee with ID ${employeeId}.`});
        })
        .catch(err => {
          return res.status(500).send({
            message: err.message | `A problem occurred deleting employee with ID ${employeeId}.`
          });
        })
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message | `A problem occurred deleting employee with ID ${employeeId}.`
      })
    })
}