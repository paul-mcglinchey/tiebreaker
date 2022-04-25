const asyncHandler = require('express-async-handler')
const db = require('../models');
const Client = db.client;

const checkIfQueryHasClientId = asyncHandler(async (req, res, next) => {
  if (!req.params.clientId) {
    res.status(400)
    throw new Error('ClientID must be set.')
  }

  next();
})

const checkUserAccessToClient = (accessRequired) => {
  return (req, res, next) => {

    this.checkClientIdExists();

    const clientId = req.body.clientId || req.params.clientId || req.query.clientId;

    Client.findById(clientId)
      .then((data) => {
        if (data.accessControl) {
          if (data.accessControl[accessRequired].includes(req.auth._id)) {
            next();
          } else {
            return res.status(403).send({
              message: `User with ID ${req.auth._id} not properly authorized to perform that action on client with ID ${clientId}.`
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
  checkIfQueryHasClientId,
  checkUserAccessToClient
};

module.exports = clientMiddlware;