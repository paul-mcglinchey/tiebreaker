const db = require('../models');
const { setUserDefaultGroup } = require('./user.controller');
const RotaGroup = db.rotagroup;
const Employee= db.employee.Employee;
const GroupList = db.grouplist;

// Read Operations
exports.getRotaGroups = async (req, res) => {
  
  // the mongoose query to fetch the groups for the current user
  let groupQuery = { 'accessControl.viewers': req.auth.userUuid };

  const groupCount = await RotaGroup
    .countDocuments(groupQuery)
    .then(groupCount => groupCount)
    .catch(err => res.status(500)
      .send({
        message: err.message || `A problem occurred fetching the number of groups for user with ID ${req.auth.userUuid}.`
      }));

  const groups = await RotaGroup
    .find(groupQuery)
    .then(groups => groups)
    .catch(err => {
      res.status(401).send({
        message:
          err.message || `An error occurred while getting groups for user with ID: ${req.auth.userUuid}.`
      });
    });

  res.status(200).send({
    count: groupCount,
    groups: groups
  });
};

// CUD Operations
exports.createRotaGroup = async (req, res) => {
  if (req.groupexists) {
    res.status(400).send({ message: "Group already exists!" });
    return;
  }

  // get the ID of the default list set to create the group with
  const defaultListsId = await GroupList.find({ default: true })
    .then(defaultLists => defaultLists._id)
    .catch(err => res.status(500).send({ message: err.message }));

  // Create a new group model instance with the request body
  const group = new RotaGroup({
    name: req.body.name,
    description: req.body.description,
    default: req.body.default,
    accessControl: {
      viewers: [req.auth.userUuid],
      editors: [req.auth.userUuid],
      owners: [req.auth.userUuid]
    },
    listDefinitions: defaultListsId,
    colour: req.body.colour
  });

  // Save the group to the database
  group
    .save(group)
    .then(data => {
      res.status(200).send({ data: data, success: `Group ${req.body.groupName} added.` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the group.'
      });
    });
}

exports.deleteRotaGroup = async (req, res) => {
  
  const { _id } = req.body;

  // check that the _id has been passed correctly or return a 400
  if (!_id) res.status(400).send({ message: 'A valid ID must be provided in order to delete a group.'})

  if (!req.groupexists) {
    res.status(400).send({ message: "Group doesn't exist" });
    return;
  }

  RotaGroup.findOne({ _id: _id, 'accessControl.owners': req.auth.userUuid })
    .then(group => {
      var employeeIds = group.employees;
      Employee.deleteMany({ _id: employeeIds })
        .then(() => {
          RotaGroup.updateOne({ _id: _id, 'accessControl.owners': req.auth.userUuid }, { employees: [] })
            .catch(err => {
              res.status(500).send({
                message: err.message || `Could not update the group with id ${_id}.`
              });
            })
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || `Could not delete clients from ${_id}.`
          })
        });
    })
    .then(() => {
      RotaGroup.findOneAndDelete({ _id: _id, 'accessControl.owners': req.auth.userUuid })
        .then(group => {
          res.status(200).send({
            success: `Group ${group.groupName} successfully deleted.`
          })
        })
        .catch(err => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: 'Group not found with id ' + _id
            });
          };
          return res.status(500).send({
            message: 'Could not delete group with id ' + _id
          });
        });
    })
}