const db = require('../models');
const Group = db.group;

// This middleware intercepts any request to create a new group and checks that
// the group doesn't already exist
const checkIfGroupExists = (req, res, next) => {
  Group.find({ groupname: req.body.userGroup })
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
  checkIfGroupExists
};

module.exports = createGroup;