const db = require('../models');
const groupController = require('./common/group.controller');
const ClientGroup = db.clientgroup;
const Client = db.client;

// Get all client groups
exports.getClientGroups = groupController.getGroups(ClientGroup);

// Create client group
exports.createClientGroup = groupController.createGroup((defaultListsId, req) => {
  return new ClientGroup({
    name: req.body.name,
    description: req.body.description,
    accessControl: {
      viewers: [req.auth.userUuid],
      editors: [req.auth.userUuid],
      owners: [req.auth.userUuid]
    },
    listDefinitions: [defaultListsId],
    colour: req.body.colour
  })
});

// Update client group
exports.updateClientGroup = groupController.updateGroup(ClientGroup);

// Delete client group
exports.deleteClientGroup = groupController.deleteGroup(ClientGroup, (group, req, res) => {
  var clientIds = group.clients;
  var _id = group._id;
  
  Client.deleteMany({ _id: clientIds })
    .then(() => {
      ClientGroup.updateOne({ _id: _id, 'accessControl.owners': req.auth.userUuid }, { clients: [] })
        .catch(err => {
          return res.status(500).send({
            message: err.message || `Could not update the group with ID ${_id}.`
          });
        })
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || `Could not delete clients from group with ID ${_id}.`
      })
    });
});