const db = require('../models');
const Rota = db.rota;
const Employee = db.employee.Employee;

// Read operations

// Retrieve all Rotas from the database
exports.getRotas = async (req, res) => {

  // the mongoose query to fetch rotas which the current user has view access to
  let rotaQuery = { 'accessControl.viewers': req.auth.userUuid };

  const rotaCount = await Rota
    .countDocuments(rotaQuery)
    .then(rotaCount => rotaCount)
    .catch(err => {
      return res.status(500).send({
        message: err.message || `A problem occurred fetching the number of rotas user with ID ${req.auth.userUuid} has view access to.`
      })
    });

  // create the aggregate object
  const aggregate = Rota.aggregate();

  // apply match operator to aggregate
  await aggregate
    .match(rotaQuery)

  // buid the query and return the queried aggregate
  const rotas = await aggregate
    .then(rotas => rotas)
    .catch(err => {
      return res.status(500).send({
        message: err.message || `A problem occurred fetching the rotas user with ID ${req.auth.userUuid} has view access to.`
      })
    });

  return res.status(200).send({
    count: rotaCount,
    rotas: rotas
  });
}

exports.getRotaById = (req, res) => {

  const { rotaId } = req.params;

  Rota.findById(rotaId)
    .then(rota => {
      // extract the employee IDs
      const employeeIds = rota.employeeIds;

      Employee.find({ _id: employeeIds })
        .then(employees => {
          // Attach the returned employees to the current rota
          rota['employees'] = employees;

          return res.status(200).send({ rota });
        })
        .catch(err => {
          return res.status(500).send({
            message: err.message || `A problem occurred fetching employees for rota with ID ${rotaId}.`
          })
        });

    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || `A problem occurred fetching rota with ID ${rotaId}.`
      })
    });
}

exports.addRota = async (req, res) => {
  const {
    name, description, startDay, employees
  } = req.body;

  // create a new rota instance
  const rota = new Rota({
    name: name,
    description: description,
    accessControl: {
      viewers: req.auth.userUuid,
      editors: req.auth.userUuid,
      owners: req.auth.userUuid,
    },
    startDay: startDay,
    schedule: [],
    employees: employees,
    createdBy: req.auth.userUuid,
    updatedBy: req.auth.userUuid
  });

  // save the rota to the database
  rota
    .save(rota)
    .then(() => {
      return res.status(200).send({
        success: `Rota added successfully.`
      });
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || `Some error occurred while adding new rota.`
      });
    })
}

exports.updateRota = (req, res) => {
  
  const { rotaId } = req.params;

  Rota.findByIdAndUpdate(rotaId, req.body)
    .then(() => {
      return res.status(200).send({ message: `Rota with ID ${rotaId} successfully updated.`})
    })
    .catch(err => {
      return res.status(500).send({
        message: err || `A problem occurred updating rota with ID ${rotaId}.`
      })
    })
}