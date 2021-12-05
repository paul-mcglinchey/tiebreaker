const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const User = db.user;
const Group = db.group;

// Read Operations
exports.getGroups = (req, res) => {
  User.findOne({ userId: req.auth.userId }, { _id: 1 })
    .then((user) => {
      if (user) {
        Group.find({ users: new ObjectId(user._id) })
          .then((groups) => {
            return res.status(200).send({
              groups: groups
            })
          })
      } else {
        return res.status(400).send({
          message: 'No users found'
        })
      }
    })
}

// CUD Operations
exports.configureUser = (req, res) => {
  User.find({ username: req.body.username, email: req.body.email, userId: req.auth.userId })
    .then((data) => {
      if (data.length == 0) {
        createUser(req, res);
      } else {
        res.status(200).send({
          message: 'User already exists'
        })
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'An error occured while checking if the user exists'
      })
    })
}

const createUser = (req, res) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    userId: req.auth.userId,
    lastLogin: Date.now()
  });

  // Save user in the database
  user
    .save(user)
    .then(data => {
      res.status(200).send({ data: data, message: `User ${data.username} added.` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the user.'
      });
    });
}

exports.createGroup = async (req, res) => {
  if (req.groupexists) {
    res.status(400).send({ message: "Group already exists!" });
    return;
  }

  const group = new Group;

  User.find({ userId: req.auth.userId }, { _id: 1 })
    .then((result) => {
      group.groupname = req.body.userGroup;
      group.users = result;

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
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while finding the user.'
      })
    });
}