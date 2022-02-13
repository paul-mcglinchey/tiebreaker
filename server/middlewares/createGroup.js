const db = require('../models');
const Group = db.group;

// This middleware intercepts any request to create a new group and checks if it's
// the first group to be created or if a default group already exists
const checkIfFirstGroup = (req, res, next) => {
  Group.find({ users: req.auth.userUuid })
    .then(groups => {
      if (groups.length > 0) {
        req.body.default = groups.filter(g => g.default).length > 0 ? false : true;
      } else {
        req.body.default = true;
      }

      next();
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred trying to find groups for user ${req.auth.userUuid}.`
      })
    })
}

// This middleware intercepts any request to create a new group and checks that
// the group doesn't already exist
const checkIfGroupExists = (req, res, next) => {
  Group.find({ groupName: req.body.groupName })
    .then((data) => {
      if (data.length !== 0) {
        req.groupexists = true
      }

      next();
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while trying to find existing groups.'
      })
    })
}

const createGroup = {
  checkIfFirstGroup,
  checkIfGroupExists
};

module.exports = createGroup;