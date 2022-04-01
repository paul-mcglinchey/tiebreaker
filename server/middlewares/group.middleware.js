const checkUserAccessToGroup = (Model, accessRequired) => {
  return (req, res, next) => {

    const { _id } = req.body || req.params;

    Model.findById(_id)
      .then((data) => {
        if (data.accessControl) {
          if (data.accessControl[accessRequired].includes(req.auth.userUuid)) {
            next();
          } else {
            return res.status(403).send({
              message: `User with ID ${req.auth.userUuid} not properly authorized to perform that action on group with ID ${_id}.`
            });
          }
        }
      })
      .catch(err => {
        return res.status(500).send({ message: err | `An unexpected error occurred while checking user access.` });
      })
  }
}

// This middleware intercepts any request to create a new group and checks that
// the group doesn't already exist
const checkIfGroupExists = (Model) => {
  return (req, res, next) => {

    const { _id, name } = req.body || req.params;

    Model.find({ $or: [{ _id: _id }, { name: name }] })
      .then(data => {
        if (data.length !== 0) {
          req.groupexists = true;
        }

        next();
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            err.message || 'Some error occurred while trying to find existing groups.'
        })
      })
  }
}

// This middleware can be used to check if the name of a group has been used already or not
const checkIfGroupNameExists = (Model) => {
  return (req, res, next) => {
    const { name } = req.body;
    const { _id } = req.body || req.params;

    Model.find({ name: name, _id: { $ne: _id } })
      .then(data => {
        if (data.length !== 0) {
          return res.status(400).send({ message: `The group name "${name}" already exists. Use something else.` })
        }

        next();
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            err.message || 'Some error occurred while trying to find existing groups.'
        })
      })
  }
}

const checkBodyHasGroupId = () => {
  return (req, res, next) => {
    if (!req.body.groupId) return res.status(400).send({ message: 'Group must be set.' });
    next();
  }
}

const checkQueryHasGroupId = (req, res, next) => {
  if (!(req.query.groupId || req.params.groupId)) return res.status(400).send({ message: 'Group must be set.' });
  next();
}

const groupMiddleware = {
  checkIfGroupExists,
  checkUserAccessToGroup,
  checkIfGroupNameExists,
  checkBodyHasGroupId,
  checkQueryHasGroupId
};

module.exports = groupMiddleware;