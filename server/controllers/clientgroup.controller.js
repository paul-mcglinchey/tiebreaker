const db = require('../models');
const { setDefaultGroup } = require('./user.controller');
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
  const defaultListsId = await GroupList.findById('622f88cb0b1ef9aeed041347')
    .then(defaultLists => defaultLists._id)
    .catch(err => res.status(500).send({ message: err.message }));

  // Create a new group model instance with the request body
  const group = new ClientGroup({
    groupName: req.body.groupName,
    accessControl: {
      viewers: [req.auth.userUuid],
      editors: [req.auth.userUuid],
      owners: [req.auth.userUuid]
    },
    listDefinitions: [defaultListsId],
    groupColour: req.body.groupColour
  });

  // Save the group to the database
  group
    .save(group)
    .then(data => {
      // if this group has been flagged as the default group then we need to update that for the user
      // update the default group field from userfront
      setDefaultGroup(req.auth.userId, "defaultClientGroup", data._id)
        .catch(err => {
          console.log(err.message || `Some error occurred while setting the default group.`)
        })

      res.status(200).send({ data: data, success: `Group ${req.body.groupName} added.` })
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
  if (!req.groupexists) {
    res.status(500).send({ message: "Group doesn't exist" });
    return;
  }

  ClientGroup.findOne({ _id: req.body._id, 'accessControl.owners': req.auth.userUuid })
    .then(group => {
      // nothing returned so user isn't an owner of the group
      if (!group) res.status(403).send({ message: `Current user does not have authorization to delete group with name ${req.body.groupName}.` })

      // removing all the clients that belong to that group
      var clientIds = group.clients;
      Client.deleteMany({ _id: clientIds })
        .then(() => {
          ClientGroup.updateOne({ groupName: req.body.groupName }, { clients: [] })
            .catch(err => {
              res.status(500).send({
                message: err.message || `Could not update the group with name \"${req.body.groupName}.\"`
              });
            })
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || `Could not delete clients ${clientIds} from ${req.body.groupName}.`
          })
        });
    })
    .then(() => {
      // finally delete the group from the database
      ClientGroup.findByIdAndDelete({ _id: req.body._id, 'accessControl.owners': req.auth.userUuid })
        .then(group => {
          // nothing returned so user isn't an owner of the group - this should never happen hypothetically
          if (!group) res.status(403).send({ message: `Current user does not have authorization to delete group with name ${req.body.groupName}.` })

          res.status(200).send({
            success: `Group ${group.groupName} successfully deleted.`
          })
        })
        .catch(err => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: 'Group not found with id ' + req.body._id
            });
          };
          return res.status(500).send({
            message: 'Could not delete group with id ' + req.body._id
          });
        });
    })
}