const db = require('../models');
const ClientGroup = db.clientgroup;
const Client = db.client;
const GroupList = db.grouplist;

// Read Operations
exports.getClientGroups = async (req, res) => {

  // the mongoose query to fetch the groups for the current user
  let groupQuery = { 'accessControl.viewers': req.auth.userUuid };

  const groupCount = await ClientGroup
    .countDocuments(groupQuery)
    .then(groupCount => groupCount)
    .catch(err => res.status(500)
      .send({
        message: err.message || `A problem occurred fetching the number of groups for user with ID ${req.auth.userUuid}.`
      }));

  const clientGroups = await ClientGroup
    .find(groupQuery)
    .then(groups => groups)
    .catch(err => {
      res.status(401).send({
        message:
          err.message || `An error occurred while getting groups for user with ID: ${req.auth.userUuid}.`
      });
    });

  res.status(200).send({
    count: groupCount,
    groups: clientGroups
  });
};

// CUD Operations
exports.createClientGroup = async (req, res) => {
  if (req.groupexists) {
    res.status(400).send({ message: "Group already exists!" });
    return;
  }

  // get the ID of the default list set to create the group with
  const defaultListsId = await GroupList.find({ default: true })
    .then(defaultLists => defaultLists._id)
    .catch(err => res.status(500).send({ message: err.message }));

  console.log('here');

  // Create a new group model instance with the request body
  const group = new ClientGroup({
    name: req.body.name,
    description: req.body.description,
    accessControl: {
      viewers: [req.auth.userUuid],
      editors: [req.auth.userUuid],
      owners: [req.auth.userUuid]
    },
    listDefinitions: [defaultListsId],
    colour: req.body.colour
  });

  // Save the group to the database
  group
    .save(group)
    .then(data => {
      res.status(200).send({ data: data, success: `Group ${req.body.name} added.` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the group.'
      });
    });
}

// Only owners can perform this action
exports.deleteClientGroup = async (req, res) => {

  const { _id } = req.body;

  // check that the _id has been passed correctly or return a 400
  if (!_id) res.status(400).send({ message: 'An ID must be provided in order to delete a group.'})

  if (!req.groupexists) {
    res.status(500).send({ message: "Group doesn't exist" });
    return;
  }

  ClientGroup.findOne({ _id: _id, 'accessControl.owners': req.auth.userUuid })
    .then(group => {
      // nothing returned so user isn't an owner of the group
      if (!group) res.status(403).send({ message: `Current user does not have authorization to delete group with ID ${_id}.` })

      // removing all the clients that belong to that group
      var clientIds = group.clients;
      Client.deleteMany({ _id: clientIds })
        .then(() => {
          ClientGroup.updateOne({ _id: _id, 'accessControl.owners': req.auth.userUuid }, { clients: [] })
            .catch(err => {
              res.status(500).send({
                message: err.message || `Could not update the group with ID ${_id}.`
              });
            })
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || `Could not delete clients from ${req.body.groupName}.`
          })
        });
    })
    .then(() => {
      // finally delete the group from the database
      ClientGroup.findOneAndDelete({ _id: _id, 'accessControl.owners': req.auth.userUuid })
        .then(group => {
          // nothing returned so user isn't an owner of the group - this should never happen hypothetically
          if (!group) res.status(403).send({ message: `Current user does not have authorization to delete group with ID ${_id}.` })

          res.status(200).send({
            success: `Group ${group.groupName} successfully deleted.`
          })
        })
        .catch(err => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: 'Group not found with id ' + _id
            });
          };
          return res.status(500).send({
            message: 'Could not delete group with id ' + _id
          });
        });
    })
}