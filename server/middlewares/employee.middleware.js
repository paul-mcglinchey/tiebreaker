const db = require('../models');
const RotaGroup = db.rotagroup;

const checkUserAccessToGroup = (accessRequired) => {
  return (req, res, next) => {

    const { groupId } = req.body;

    RotaGroup.findById(groupId)
      .then((data) => {
        if (data.accessControl) {
          if (data.accessControl[accessRequired].includes(req.auth.userId)) {
            next();
          } else {
            return res.status(403).send({
              message: `User with ID ${req.auth.userId} not properly authorized to perform that action on group with ID ${groupId}.`
            });
          }
        }
      })
      .catch(err => {
        return res.status(500).send({ message: err | `An unexpected error occurred while checking user access.` });
      })
  }
}

const employeeMiddleware = {
  checkUserAccessToGroup
}

module.exports = employeeMiddleware;