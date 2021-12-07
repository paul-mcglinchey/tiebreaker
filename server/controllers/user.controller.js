const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const User = db.user;
const Group = db.group;

// Read Operations
exports.getGroups = (req, res) => {
  User.findOne({ userUuid: req.auth.userUuid }, { _id: 1 })
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
exports.createGroup = async (req, res) => {
  if (req.groupexists) {
    res.status(400).send({ message: "Group already exists!" });
    return;
  }

  const group = new Group;

  User.find({ userUuid: req.auth.userUuid }, { _id: 1 })
    .then((result) => {
      group.groupname = req.body.userGroup;
      group.default = req.body.default;
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

// This middleware is responsible for ensuring that Userfront users exist in the database
// Happens once each time a user hits the dashboard
exports.configureUser = (req, res, next) => {
  console.log(JSON.parse(req.headers.authorization))
  const userfront = JSON.parse(req.headers.authorization).user;

  User.find({ username: userfront.username, email: userfront.email, userUuid: userfront.userUuid })
    .then((users) => {
      if (users.length == 0) {
        const user = new User({
          email: userfront.email,
          username: userfront.username,
          userUuid: userfront.userUuid,
          lastLogin: Date.now()
        });

        // Save the new user
        user
          .save(user)
          .then(savedUser => {
            res.status(200).send({
              message: `New user added with UUID ${savedUser.userUuid}.`
            })
          })
          .catch(err => {
            res.status(401).send({
              message:
                err.message || 'Some error occurred while creating a new user.'
            });
          });
      } else {
        res.status(200).send({
          message: 'User already exists.'
        })
      }
    })
    .catch(err => {
      res.status(401).send({
        message:
          err.message || 'Some error occurred while checking if the user exists.'
      })
    })
}