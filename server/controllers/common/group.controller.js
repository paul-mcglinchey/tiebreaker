const db = require('../../models');
const GroupList = db.grouplist;

// Get all groups
exports.getGroups = (Model) => {
  return async (req, res) => {

    // the mongoose query to fetch the groups for the current user
    let groupQuery = { 'accessControl.viewers': req.auth.userUuid };

    const groupCount = await Model
      .countDocuments(groupQuery)
      .then(groupCount => groupCount)
      .catch(err => {
        return res.status(500).send({
          message: err.message || `A problem occurred fetching the number of groups for user with ID ${req.auth.userUuid}.`
        })
      });

    const groups = await Model
      .find(groupQuery)
      .then(groups => groups)
      .catch(err => {
        return res.status(401).send({
          message:
            err.message || `An error occurred while getting groups for user with ID: ${req.auth.userUuid}.`
        });
      });

    return res.status(200).send({
      count: groupCount,
      groups: groups
    });
  }
}

// Create group
exports.createGroup = (getGroupModel) => {
  return async (req, res) => {
    // get the ID of the default list set to create the group with
    const defaultListsId = await GroupList.find({ default: true })
      .then(defaultLists => defaultLists._id)
      .catch(err => res.status(500).send({ message: err.message || `A problem occurred getting the default list.`}))
    
    const group = getGroupModel(defaultListsId, req);

    // save the group to the database
    group
      .save(group)
      .then(data => {
        return res.status(200).send({ data: data, message: `Group ${req.body.name} added.` })
      })
      .catch(err => {
        return res.status(500).send({
          message: err.message || `Some error occurred while creating the group.`
        });
      });
  }
}

// Update group
exports.updateGroup = (Group) => {
  return (req, res) => {
    const { _id } = req.body;

    Group.findByIdAndUpdate(_id, req.body)
      .then(() => res.status(200).send({ message: `Successfully updated group with ID ${_id}.`}))
      .catch(err => {
        return res.status(500).send({ message: err || `A problem occurred while updating group with ID ${_id}.`})
      })
  }
}

// Delete group
exports.deleteGroup = (Group, cleanupFunction) => {
  return (req, res) => {
    const { _id } = req.body;

    // check that the _id has been passed correctly or return a 400
    if (!_id) return res.status(400).send({ message: 'A valid ID must be provided in order to delete a group.' })

    if (!req.groupexists) return res.status(400).send({ message: "Group doesn't exist" });

    Group.findOne({ _id: _id, 'accessControl.owners': req.auth.userUuid })
      .then(group => {
        cleanupFunction(group, req, res);
      })
      .then(() => {
        Group.findOneAndDelete({ _id: _id, 'accessControl.owners': req.auth.userUuid })
          .then(group => {
            return res.status(200).send({
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
}