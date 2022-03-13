const db = require('../models');
const Rota = db.rota;

// Read operations

// Retrieve all Rotas from the database
exports.getRotas = async (req, res) => {

  // the mongoose query to fetch rotas which the current user has view access to
  let rotaQuery = { 'accessControl.viewers': req.auth.userUuid };

  const rotaCount = await Rota
    .countDocuments(rotaQuery)
    .then(rotaCount => rotaCount)
    .catch(err => res.status(500)
      .send({
        message: err.message || `A problem occurred fetching the number of rotas user with ID ${req.auth.userUuid} has view access to.`
      })
    );

  // create the aggregate object
  const aggregate = Rota.aggregate();

  // apply match operator to aggregate
  await aggregate
    .match(rotaQuery)

  // buid the query and return the queried aggregate
  const rotas = await aggregate
    .then(rotas => rotas)
    .catch(err => res.status(500)
      .send({
        message: err.message || `A problem occurred fetching the rotas user with ID ${req.auth.userUuid} has view access to.`
      })
    );

  res.status(200).send({
    count: rotaCount,
    rotas: rotas
  });
}

exports.addRota = async (req, res) => {
  const {
    startDate, endDate, employees
  } = req.body;

  // populate the schedule object
  const schedule = [];

  employees.forEach(e => {
    schedule.push({
      employee: e,
      shifts: []
    });
  });

  // create a new rota instance
  const rota = new Rota({
    accessControl: {
      viewers: req.auth.userUuid,
      editors: req.auth.userUuid,
      owners: req.auth.userUuid,
    },
    startDate: startDate,
    endDate: endDate,
    schedule: schedule,
    createdBy: req.auth.userUuid,
    updatedBy: req.auth.userUuid
  });

  // save the rota to the database
  rota
    .save(rota)
    .then(() => {
      res.status(200).send({
        success: `Rota added successfully.`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while adding new rota.`
      });
    })
}