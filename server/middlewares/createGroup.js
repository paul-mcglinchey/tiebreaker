const db = require('../models');
const RotaGroup = db.rotagroup;
const ClientGroup = db.clientgroup;

// This middleware intercepts any request to create a new group and checks if it's
// the first group to be created or if a default group already exists
const checkIfFirstGroup = (req, res, next) => {
  ClientGroup.find({ users: req.auth.userUuid })
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
const checkIfClientGroupExists = (req, res, next) => {
  ClientGroup.find({ groupName: req.body.groupName })
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
const checkIfRotaGroupExists = (req, res, next) => {
  RotaGroup.find({ groupName: req.body.groupName })
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

// This middleware intercepts group related requests and checks the current users access
const checkUserAccessToGroup = (accessRequired) => {
  return async (req, res, next) => {
    // check if the group exists before checking access
    checkIfGroupExists();

    RotaGroup.find({ groupName: req.body.groupName })
      .then((data) => {
        if (data.accessControl) {
          if (data.accessControl[accessRequired].contains(req.auth.userUuid)) {
            next();
          } else {
            res.status(403).send({
              message: `User with ID ${req.auth.userUuid} not properly authorized with group ${req.body.groupName}`
            });
          }
        }
      })

    next();
  }
}

const createGroup = {
  checkIfFirstGroup,
  checkIfClientGroupExists,
  checkIfRotaGroupExists,
  checkUserAccessToGroup
};

module.exports = createGroup;