const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const ClientGroup = db.clientgroup;
const Client = db.client;
const Session = db.session;
const ActivityLog = db.activitylog;

// Read operations

// Retrieve all clients from the database
exports.findAll = async (req, res) => {

  let { pageSize, pageNumber, groupId, sortField, sortDirection, clientName } = await req.query;

  // check that groupId is set, else return a 400
  if (!groupId) {
    res.status(400).send({ message: 'Group ID must be set in order to retrieve clients'})
  }

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
        .catch(err => res.status(500)
          .send({
            message: err.message || `A problem occurred fetching the number of clients for group with ID ${groupId}.`
          }));
      
      // create the aggregate object (functions like an IQueryable)
      const aggregate = Client.aggregate();

      // apply a match operator to the pipeline to only return clients for the current group
      // add a new fullName field to filter on
      await aggregate
        .match(clientQuery)
        .addFields({ fullName: { $concat: [ '$clientName.firstName', ' ', '$clientName.lastName' ] } });
      
      // if a filter for the fullName was passed in then use it to apply a match operator to the aggregate
      if (clientName) {
          await aggregate.match({ fullName: { $regex: clientName, $options: 'i' } });
      }

      // finally build the other query parameters and return the aggregate as the clients queryable
      const clients = await aggregate
        .sort({ [sortField]: (sortDirection == "descending" ? -1 : 1) })
        .skip(((pageNumber || 1) - 1) * pageSize)
        .limit(parseInt(pageSize))
        .then(clients => clients)
        .catch(err => res.status(500)
          .send({
            message: err.message || `A problem occurred fetching the list of clients for group with ID ${groupId}.`
          }))

      res.status(200).send({
        count: clientCount,
        clients: clients
      });
    })
    .catch(err => {
      res.status(401).send({
        message:
          err.message || `A problem occurred finding group with ID ${groupId}.`
      });
    });
};

// Retrieve a specific client by Id
exports.findById = async (req, res) => {

  // convert the clientId from a string to an ObjectId for the aggregation pipeline
  const clientId = new ObjectId(req.params.clientId);

  // create the aggregator so we can add custom fields
  const aggregate = Client.aggregate();

  // apply a match operator and add a fullname field
  await aggregate
    .match({ _id: clientId })
    .addFields({ fullName: { $concat: [ '$clientName.firstName', ' ', '$clientName.lastName' ] } });

  const client = await aggregate
    .then(client => client[0])
    .catch(err => {
      res.status(500).send({
        message: err.message || `A problem occurred fetching client with ID ${clientId}.`
      })
    });

  res.status(200).send({ client });
}

// CUD Operations
// Create and save a new client
exports.create = (req, res) => {
  const {
    firstName, lastName, middleNames,
    addressLineOne, addressLineTwo, addressLineThree, city, country, postCode,
    birthdate,
    email, phoneNumber, emails, phoneNumbers,
    clientColour
  } = req.body;

  // Create a new client
  const client = new Client({
    clientName: {
      firstName: firstName,
      lastName: lastName,
      middleNames: middleNames.split(" ")
    },
    address: {
      firstLine: addressLineOne,
      secondLine: addressLineTwo,
      thirdLine: addressLineThree,
      city: city,
      country: country,
      postCode: postCode
    },
    birthdate: birthdate,
    contactInfo: {
      primaryEmail: email,
      primaryPhoneNumber: phoneNumber,
      emails: emails,
      phoneNumbers: phoneNumbers
    },
    sessions: [],
    clientColour: clientColour,
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
        _id: req.body.groupId,
        $or: [{ 'accessControl.editors': req.auth.userUuid }, { 'accessControl.owners': req.auth.userUuid }] 
      }, { 
        $push: { clients: new ObjectId(data._id) } 
      })
        .then(() => {
          res.status(200).send({
            success: `Client created successfully in group with ID ${req.body.groupId}.`
          })
        })
        .catch(err => {
          res.status(401).send({
            message:
              err.message || `Could not add client to group with ID ${req.body.groupId}.`
          })
        })
    })
    .catch(err => {
      res.status(500).send({
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
      res.status(200).send(client);
    })
    .catch(err => {
      res.status(500).send({
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
      res.status(500).send({
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
          $push: { activityLog: {
            task: "added session",
            actor: req.auth.userUuid
          }}
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
exports.delete = (req, res) => {
  // Update the group clients array to remove this client
  ClientGroup.findOneAndUpdate({ 
    groupName: req.body.groupName,
    $or: [{ 'accessControl.editors': req.auth.userUuid }, { 'accessControl.owners': req.auth.userUuid }]
  }, { 
    $pull: { clients: req.body.clientId } 
  })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Client not found with id ' + req.query.clientId
        });
      };
      return res.status(500).send({
        message: 'Could not delete client with id ' + req.query.clientId
      });
    });

  // Delete the client from the clients db
  Client.findOneAndDelete({ _id: req.body.clientId })
    .then(() => {
      res.status(200).send({
        success: `Successfully deleted client ${req.body.clientId}`
      })
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Client not found with id ' + req.query.clientId
        });
      };
      return res.status(500).send({
        message: 'Could not delete client with id ' + req.query.clientId
      });
    });
}