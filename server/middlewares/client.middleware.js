const db = require('../models');
const Client = db.client;

const checkClientIdExists = (req, res, next) => {
  if (!(req.params.clientId || req.query.clientId)) return res.status(400).send({ message: 'ClientID must be set.' });
  next();
}

const checkUserAccessToClient = (accessRequired) => {
  return (req, res, next) => {

    this.checkClientIdExists();

    const clientId = req.body.clientId || req.params.clientId || req.query.clientId;

    Client.findById(clientId)
      .then((data) => {
        if (data.accessControl) {
          if (data.accessControl[accessRequired].includes(req.auth.userId)) {
            next();
          } else {
            return res.status(403).send({
              message: `User with ID ${req.auth.userId} not properly authorized to perform that action on client with ID ${clientId}.`
            });
          }
        }
      })
      .catch(err => {
        return res.status(500).send({ message: err | `An unexpected error occurred while checking user access.` });
      })
  }
}

const clientMiddlware = {
  checkClientIdExists,
  checkUserAccessToClient
};

module.exports = clientMiddlware;