const db = require('../models');
const { setDefaultGroup } = require('./user.controller');
const RotaGroup = db.rotagroup;
const Employee = db.employee;
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

  // get the default list set to create the group with
  const defaultListsId = await GroupList.findById('622f88cb0b1ef9aeed041347')
    .then(defaultLists => defaultLists._id)
    .catch(err => res.status(500).send({ message: err.message || `A problem occurred fetching the default list definitions.` }));

  // Create a new group model instance with the request body
  const group = new RotaGroup({
    groupName: req.body.groupName,
    default: req.body.default,
    accessControl: {
      viewers: [req.auth.userUuid],
      editors: [req.auth.userUuid],
      owners: [req.auth.userUuid]
    },
    listDefinitions: defaultListsId,
    groupColour: req.body.groupColour
  });

  // Save the group to the database
  group
    .save(group)
    .then(data => {
      // if this group has been flagged as the default group then we need to update that for the user
      // update the default group field from userfront
      setDefaultGroup(req.auth.userId, "defaultRotaGroup", data._id)
        .catch(err => {
          res.status(500).send(err.message || `Some error occurred while setting the default group.`)
        })

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
  if (!req.groupexists) {
    res.status(400).send({ message: "Group doesn't exist" });
    return;
  }

  RotaGroup.findOne({ groupName: req.body.groupName, 'accessControl.owners': req.auth.userUuid })
    .then(group => {
      var employeeIds = group.employees;
      Employee.deleteMany({ _id: employeeIds })
        .then(() => {
          RotaGroup.updateOne({ groupName: req.body.groupName }, { employees: [] })
            .catch(err => {
              res.status(500).send({
                message: err.message || `Could not update the group with name \"${req.body.groupName}\"`
              });
            })
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || `Could not delete clients ${clientIds} from ${req.body.groupName}.`
          })
        });
    })
    .then(() => {
      Group.findByIdAndDelete({ _id: req.body._id })
        .then(group => {
          res.status(200).send({
            success: `Group ${group.groupName} successfully deleted.`
          })
        })
        .catch(err => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: 'Group not found with id ' + req.body._id
            });
          };
          return res.status(500).send({
            message: 'Could not delete group with id ' + req.body._id
          });
        });
    })
}