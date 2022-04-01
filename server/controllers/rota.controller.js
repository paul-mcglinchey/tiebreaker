const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const Rota = db.rota;
const RotaGroup = db.rotagroup;
const { Employee } = db.employee;

// Read operations

// Retrieve all Rotas from the database
exports.getRotas = async (req, res) => {

  // Get the groupId from the query
  const { groupId } = await req.query;

  RotaGroup.findOne({ _id: groupId, 'accessControl.viewers': req.auth.userUuid })
    .then(async (group) => {

      // all the rotas that belong to the requested group
      let rotaIds = group.rotas;

      // the mongoose query to fetch rotas which the current user has view access to
      let rotaQuery = { _id: { $in: rotaIds } };

      const rotaCount = await Rota
        .countDocuments(rotaQuery)
        .then(rotaCount => rotaCount)
        .catch(err => {
          return res.status(500).send({
            message: err.message || `A problem occurred fetching the number of rotas from with ID ${groupId}.`
          })
        });

      // create the aggregate object
      const aggregate = Rota.aggregate();

      // apply match operator to aggregate
      await aggregate.match(rotaQuery)

      // buid the query and return the queried aggregate
      const rotas = await aggregate
        .then(rotas => rotas)
        .catch(err => {
          return res.status(500).send({
            message: err.message || `A problem occurred fetching the rotas from group with ID ${groupId}.`
          })
        });

      return res.status(200).send({
        count: rotaCount,
        rotas: rotas
      });
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || `A problem occurred finding group with ID ${groupId}.`
      });
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

  const { groupId } = req.query;

  const {
    name, description, startDay, employeeIds
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
    employeeIds: employeeIds,
    createdBy: req.auth.userUuid,
    updatedBy: req.auth.userUuid
  });

  // save the rota to the database
  rota
    .save(rota)
    .then(rota => {
      // Add the ID of this rota to the group which it was added under
      // Add the employee to the group which was selected
      RotaGroup.updateOne({
        _id: groupId,
        $or: [{ 'accessControl.editors': req.auth.userUuid }, { 'accessControl.owners': req.auth.userUuid }]
      }, {
        $push: { rotas: new ObjectId(rota._id) }
      })
        .then(() => {
          return res.status(200).send({
            success: `Rota added successfully.`
          });
        })
        .catch(err => {
          return res.status(500).send({
            message:
              err.message || `Could not add rota to group with ID ${groupId}.`
          });
        })

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
      return res.status(200).send({ message: `Rota with ID ${rotaId} successfully updated.` })
    })
    .catch(err => {
      return res.status(500).send({
        message: err || `A problem occurred updating rota with ID ${rotaId}.`
      })
    })
}

exports.deleteRota = (req, res) => {
  const { rotaId } = req.params;

  Rota.findByIdAndDelete(rotaId)
    .then(() => res.status(200).send({ message: `Successfully deleted rota with ID ${rotaId}.`}))
    .catch(err => {
      return res.status(500).send({ message: err || `An error occurred while deleting rota with ID ${rotaId}.`})
    })
}