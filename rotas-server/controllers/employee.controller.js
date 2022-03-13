const db = require('../models');
const Employee = db.employee;

// Read operations

// Retrieve all employees that the currently logged in user has view access to
exports.getEmployees = async (req, res) => {

  // the mongoose query to fetch the employees
  let employeeQuery = { 'accessControl.viewers': req.auth.userUuid };

  const employeeCount = await Employee
    .countDocuments(employeeQuery)
    .then(employeeCount => employeeCount)
    .catch(err => res.status(500)
      .send({
        message: err.message || `A problem occurred fetching the number of employees which user with ID ${req.auth.userUuid} has view access to.`
      })
    );

  // create the aggregate object
  const aggregate = Employee.aggregate();

  // apply a match operator to the aggregate
  await aggregate
    .match(employeeQuery)

  // build the query and execute the aggregator
  const employees = await aggregate
    .then(employees => employees)
    .catch(err => res.status(500)
      .send({
        message: err.message || `A problem occurred fetching the employees which user with ID ${req.auth.userUuid} has view access to.`
      })
    );

  res.status(200).send({
    count: employeeCount,
    employees: employees
  })
}

exports.addEmployee = async (req, res) => {
  const {
    role, reportsTo,
    name, address, contactInfo, birthdate,
    startDate, minHours, maxHours, unavailableDays, holidays,
    employeeColour
  } = req.body;

  // Create a new employee
  const employee = new Employee({
    accessControl: {
      viewers: [req.auth.userUuid], editors: [req.auth.userUuid], owners: [req.auth.userUuid]
    },
    role: role,
    reportsTo: reportsTo,
    name: {
      firstName: name.firstName,
      lastName: name.lastName,
      middleNames: name.middleNames
    },
    address: {
      firstLine: address.addressLineOne,
      secondLine: address.addressLineTwo,
      thirdLine: address.addressLineThree,
      city: address.city,
      country: address.country,
      postCode: address.postCode
    },
    birthdate: birthdate,
    contactInfo: {
      primaryEmail: contactInfo.email,
      primaryPhoneNumber: contactInfo.phoneNumber,
      emails: contactInfo.emails,
      phoneNumbers: contactInfo.phoneNumbers
    },
    startDate: startDate,
    minHours: minHours,
    maxHours: maxHours,
    unavailableDays: unavailableDays || [],
    holidays: holidays || [],
    createdBy: req.auth.userUuid,
    updatedBy: req.auth.userUuid,
    employeeColour: employeeColour
  });

  // Save employee in the database
  employee
    .save(employee)
    .then(() => {
      res.status(200).send({
        success: `Employee added successfully.`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || `Some error occurred while adding new employee.`
      });
    });
}