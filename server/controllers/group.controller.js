const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const Group = db.group;
const Client = db.client;

// Read Operations
exports.getCount = (req, res) => {
  Group.countDocuments({ users: req.auth.userUuid })
    .then(count => {
      return res.status(200).send({
        count: count
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `An error occurred counting the number of groups that user ${req.auth.userUuid} belongs to.`
      })
    })
}

exports.getGroups = (req, res) => {
  Group.find({ users: req.auth.userUuid })
    .then((groups) => {
      return res.status(200).send({
        groups: groups
      })
    })
    .catch(err => {
      res.status(401).send({
        message:
          err.message || 'An error occurred while getting groups for user with ID: ' + req.auth.userUuid
      });
    });
}

// CUD Operations
exports.createGroup = async (req, res) => {
  if (req.groupexists) {
    res.status(400).send({ message: "Group already exists!" });
    return;
  }
  console.log(req.body.default);

  // Create a new group model instance with the request body
  const group = new Group({
    groupname: req.body.groupname,
    default: req.body.default,
    users: req.auth.userUuid
  });

  // Save the group to the database
  group
    .save(group)
    .then(data => {
      res.status(200).send({ data: data, success: `Group ${req.body.groupname} added.` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the group.'
      });
    });
}

exports.deleteGroup = async (req, res) => {
  if (!req.groupexists) {
    res.status(500).send({ message: "Group doesn't exist" });
    return;
  }

  Group.findOne({ groupname: req.body.groupname })
    .then(group => {
      var clientIds = group.clients;
      Client.deleteMany({ _id: clientIds })
        .then(() => {
          Group.updateOne({ groupname: req.body.groupname }, { clients: [] })
            .catch(err => {
              res.status(500).send({
                message: err.message || `Could not update the group with name \"${req.body.groupname}\"`
              });
            })
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || `Could not delete clients ${clientIds} from ${req.body.groupname}`
          })
        });
    })
    .then(() => {
      Group.findByIdAndDelete({ _id: req.body._id })
        .then(group => {
          res.status(200).send({
            success: `Group ${group.groupname} successfully deleted.`
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