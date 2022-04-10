const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const ClientGroup = db.clientgroup;
const Client = db.client;
const Session = db.session;
const ActivityLog = db.activitylog;

// Read operations

// Retrieve all clients from the database
exports.getClients = async (req, res) => {

  let { pageSize, pageNumber, groupId, sortField, sortDirection, name } = await req.query;

  pageSize = parseInt(pageSize);
  pageNumber = parseInt(pageNumber);

  ClientGroup.findOne({ _id: groupId, 'accessControl.viewers': req.auth.userUuid })
    .then(async (group) => {

      // all the clients that belong to the requested group
      let clientIds = group.clients;

      // the mongoose query to fetch those clients
      let clientQuery = { _id: { $in: clientIds } };

      const clientCount = await Client
        .countDocuments(clientQuery)
        .then(clientCount => clientCount)
        .catch(err => {
          return res.status(500).send({
            message: err.message || `A problem occurred fetching the number of clients for group with ID ${groupId}.`
          })
        });

      // create the aggregate object (functions like an IQueryable)
      const aggregate = Client.aggregate();

      // apply a match operator to the pipeline to only return clients for the current group
      // add a new fullName field to filter on
      await aggregate
        .match(clientQuery)
        .addFields({ fullName: { $concat: ['$name.firstName', ' ', '$name.lastName'] } });

      // if a filter for the fullName was passed in then use it to apply a match operator to the aggregate
      if (name) {
        await aggregate.match({ fullName: { $regex: name, $options: 'i' } });
      }

      // finally build the other query parameters and return the aggregate as the clients queryable
      const clients = await aggregate
        .sort({ [sortField]: (sortDirection == "descending" ? -1 : 1) })
        .skip(((pageNumber || 1) - 1) * pageSize)
        .limit(pageSize)
        .exec()
        .catch(err => {
          return res.status(500).send({
            message: err.message || `A problem occurred fetching the list of clients for group with ID ${groupId}.`
          })
        });

      return res.status(200).send({
        count: clientCount,
        clients: clients
      });

    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || `A problem occurred finding group with ID ${groupId}.`
      });
    });
};

// Retrieve a specific client by Id
exports.getClientById = async (req, res) => {

  // convert the clientId from a string to an ObjectId for the aggregation pipeline
  const clientId = new ObjectId(req.params.clientId);

  // create the aggregator so we can add custom fields
  const aggregate = Client.aggregate();

  // apply a match operator and add a fullname field
  await aggregate
    .match({ _id: clientId })
    .addFields({ fullName: { $concat: ['$name.firstName', ' ', '$name.lastName'] } });

  const client = await aggregate
    .then(client => client[0])
    .catch(err => {
      return res.status(500).send({
        message: err.message || `A problem occurred fetching client with ID ${clientId}.`
      })
    });

  return res.status(200).send({ client });
}

// CUD Operations
// Create and save a new client
exports.create = (req, res) => {

  const { groupId } = req.query;

  const {
    name,
    address,
    contactInfo,
    colour,
    birthdate
  } = req.body;

  // Create a new client
  const client = new Client({
    accessControl: {
      viewers: [req.auth.userUuid], editors: [req.auth.userUuid], owners: [req.auth.userUuid]
    },
    name: {
      firstName: name.firstName,
      lastName: name.lastName,
      middleNames: name.middleNames && name.middleNames.split(" ")
    },
    address: {
      firstLine: address.firstLine,
      secondLine: address.secondLine,
      thirdLine: address.thirdLine,
      city: address.city,
      country: address.country,
      postCode: address.postCode
    },
    birthdate: birthdate,
    contactInfo: {
      primaryEmail: contactInfo.primaryEmail,
      primaryPhoneNumber: contactInfo.primaryPhoneNumber,
      emails: contactInfo.emails,
      phoneNumbers: contactInfo.phoneNumbers
    },
    sessions: [],
    colour: colour,
    activityLog: {
      task: "created",
      actor: req.auth.userUuid
    },
    createdBy: req.auth.userUuid,
    updatedBy: req.auth.userUuid
  });

  // Save client in the database
  client
    .save(client)
    .then(data => {
      // Add the client to the group which was selected
      ClientGroup.updateOne({
        _id: groupId,
        $or: [{ 'accessControl.editors': req.auth.userUuid }, { 'accessControl.owners': req.auth.userUuid }]
      }, {
        $push: { clients: new ObjectId(data._id) }
      })
        .then(() => {
          return res.status(200).send({
            success: `Client created successfully in group with ID ${req.body.groupId}.`
          })
        })
        .catch(err => {
          return res.status(500).send({
            message:
              err.message || `Could not add client to group with ID ${req.body.groupId}.`
          })
        })
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || `Some error occurred while creating client.`
      });
    });
};

// Update a client
exports.updateClient = (req, res) => {
  const { clientId } = req.params;

  var updateBody = req.body.updateBody;
  updateBody.activityLog.push({
    task: "updated",
    actor: req.auth.userUuid
  })

  Client.findByIdAndUpdate(clientId, updateBody)
    .then(client => {
      return res.status(200).send(client);
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || `Could not update the client with ID ${clientId}.`
      })
    });
}

// Get a client and update their profile colour
exports.updateColour = (req, res) => {
  const { clientId } = req.params;

  var clientColour = req.body.clientColour;

  Client.findByIdAndUpdate(clientId, { clientColour: clientColour })
    .then(client => res.status(200).send({ client }))
    .catch(err => {
      return res.status(500).send({
        message: err.message || `A problem occurred updating client ${clientId} with colour ${profileColour}.`
      })
    });
}

// Add a session to a specific client
exports.addSession = (req, res) => {

  const { clientId } = req.params;
  const { title, description, tags, sessionDate } = req.body;

  const session = new Session({
    title: title,
    description: description,
    tags: tags,
    sessionDate: sessionDate,
    createdBy: req.auth.userUuid,
    updatedBy: req.auth.userUuid
  });

  Client.findByIdAndUpdate(clientId, { $push: { sessions: session } })
    .then(client => {

      // update the metadata on the client
      Client.findByIdAndUpdate(client._id, {
        updatedBy: req.auth.userUuid,
        $push: {
          activityLog: {
            task: "added session",
            actor: req.auth.userUuid
          }
        }
      })
        .catch(err => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: 'Client not found with id ' + clientId
            });
          };
          return res.status(500).send({
            message: err || `Could not update client with id ${clientId}`
          });
        });

      res.status(200).send({ updatedClient: client })
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Client not found with id ' + clientId
        });
      };
      return res.status(500).send({
        message: err || `Could not update client with id ${clientId}`
      });
    })
}

// Deletes a client by ID
exports.deleteClient = (req, res) => {
  const { clientId } = req.params;
  const { groupId } = req.query;

  // Delete the client from the clients db
  Client.findByIdAndDelete(clientId)
    .then(() => {
      ClientGroup.findByIdAndUpdate(groupId, { $pull: { clients: clientId } })
        .then(() => res.status(200).send({ message: `Successfully deleted client with ID ${clientId}.` }))
        .catch(err => {
          return res.status(500).send({
            message: err || `A problem occurred while removing the client from their group. The client was likely deleted successfully however.`
          })
        })
    })
    .catch(err => {
      return res.status(500).send({ message: err || `An error occurred while deleting client with ID ${clientId}.` })
    })
}