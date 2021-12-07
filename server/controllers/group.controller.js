const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const Group = db.group;

// Read Operations
exports.getGroups = (req, res) => {
  Group.find({ "users.userUuid": req.auth.userUuid })
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

  // Create a new group model instance with the request body
  const group = new Group({
    groupname: req.body.userGroup,
    default: req.body.default,
    users: req.auth.userUuid
  });

  // Save the group to the database
  group
    .save(group)
    .then(data => {
      res.status(200).send({ data: data, success: `Group ${req.body.userGroup} added.` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the group.'
      });
    });
}