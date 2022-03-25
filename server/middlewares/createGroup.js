const db = require('../models');
const RotaGroup = db.rotagroup;
const ClientGroup = db.clientgroup;

const checkRequestHasId = (req, res, next) => {
  const { _id } = req.body;
  if (!_id) res.status(400).send({ message: 'An ID must be provided.' });

  next();
}

// This middleware intercepts any request to create a new group and checks that
// the group doesn't already exist
const checkIfClientGroupExists = (req, res, next) => {

  const { _id, name } = req.body;

  ClientGroup.find({ $or: [{ _id: _id }, { name: name }]})
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

  const { _id, name } = req.body;

  RotaGroup.find({ $or: [{ _id: _id }, { name: name }]})
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

// This middleware intercepts clientgroup related requests and checks the current users access
const checkUserAccessToClientGroup = (accessRequired) => {
  return async (req, res, next) => {

    const { _id } = req.body;

    ClientGroup.findById(_id)
      .then((data) => {
        if (data.accessControl) {
          if (data.accessControl[accessRequired].contains(req.auth.userUuid)) {
            next();
          } else {
            res.status(403).send({
              message: `User with ID ${req.auth.userUuid} not properly authorized to perform that action on group with ID ${_id}.`
            });
          }
        }
      })

    next();
  }
}

// This middleware intercepts rotagroup related requests and checks the current users access
const checkUserAccessToRotaGroup = (accessRequired) => {
  return async (req, res, next) => {

    const { _id } = req.body;

    RotaGroup.findById(_id)
      .then((data) => {
        if (data.accessControl) {
          if (data.accessControl[accessRequired].contains(req.auth.userUuid)) {
            next();
          } else {
            res.status(403).send({
              message: `User with ID ${req.auth.userUuid} not properly authorized to perform that action on group with ID ${_id}.`
            });
          }
        }
      })

    next();
  }
}

const createGroup = {
  checkRequestHasId,
  checkIfClientGroupExists,
  checkIfRotaGroupExists,
  checkUserAccessToClientGroup,
  checkUserAccessToRotaGroup
};

module.exports = createGroup;