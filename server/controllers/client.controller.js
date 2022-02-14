const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const Group = db.group;
const Client = db.client;
const Session = db.session;

// Read operations

// Retrieve all clients from the database
exports.findAll = async (req, res) => {

  let { pageSize, pageNumber, groupName, sortField, sortDirection, clientName } = await req.query;

  pageSize = parseInt(pageSize);
  pageNumber = parseInt(pageNumber);

  Group.findOne({ groupName: groupName })
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
            message: err.message || `A problem occurred fetching the number of clients for group ${groupName}.`
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
            message: err.message || `A problem occurred fetching the list of clients for group ${groupName}.`
          }))

      res.status(200).send({
        totalClients: clientCount,
        clients: clients
      });
    })
    .catch(err => {
      res.status(401).send({
        message:
          err.message || `A problem occurred finding group "${req.query.userGroup}".`
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
    createdBy, updatedBy,
    clientColour
  } = req.body;

  console.log(req.auth);

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
      actor: {
        uuid: req.auth.userUuid,
        name: createdBy
      }
    },
    createdBy: {
      uuid: req.auth.userUuid,
      name: createdBy
    },
    updatedBy: {
      uuid: req.auth.userUuid,
      name: updatedBy
    },
  });

  // Save client in the database
  client
    .save(client)
    .then(data => {
      // Add the client to the group which was selected
      Group.updateOne({ groupName: req.body.groupName }, { $push: { clients: new ObjectId(data._id) } })
        .then(() => {
          res.status(200).send({
            success: `Client created successfully in ${req.body.groupName}.`
          })
        })
        .catch(err => {
          res.status(401).send({
            message:
              err.message || `Could not add client ${data._id} to group ${req.body.userGroup}.`
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
    actor: {
      uuid: req.auth.userUuid,
      name: req.body.updatedBy
    }
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

// Add a session to a specific client
exports.addSession = (req, res) => {

  const { clientId } = req.params;
  const { title, description, tags, sessionDate, createdBy, updatedBy } = req.body;

  const session = new Session({
    title: title,
    description: description,
    tags: tags,
    sessionDate: sessionDate,
    createdBy: {
      uuid: req.auth.userUuid,
      name: createdBy
    },
    updatedBy: {
      uuid: req.auth.userUuid,
      name: updatedBy
    }
  });

  Client.findByIdAndUpdate(clientId, { $push: { sessions: session } })
    .then(client => {

      // update the metadata on the client
      Client.findByIdAndUpdate(client._id, { 
          updatedBy: { 
            uuid: req.auth.userUuid, 
            name: updatedBy 
          },
          $push: { activityLog: {
            task: "added session",
            actor: {
              uuid: req.auth.userUuid,
              name: updatedBy
            }
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
  Group.findOneAndUpdate({ groupName: req.body.groupName }, { $pull: { clients: req.body.clientId } })
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