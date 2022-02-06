const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const Group = db.group;
const Client = db.client;

// Read operations

// Retrieve all clients from the database
exports.findAll = async (req, res, next) => {

  let { pageSize, pageNumber, groupname } = await req.query;

  pageSize = parseInt(pageSize);
  pageNumber = parseInt(pageNumber);

  Group.findOne({ groupname: groupname })
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
            message: err.message || `A problem occurred fetching the number of clients for group ${groupname}.`
          }));

      const clients = await Client
        .find(clientQuery)
        .skip(((pageNumber || 1) - 1) * pageSize)
        .limit(parseInt(pageSize))
        .then(clients => clients)
        .catch(err => res.status(500)
          .send({
            message: err.message || `A problem occurred fetching the list of clients for group ${groupname}.`
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

// CUD Operations
// Create and save a new client
exports.create = (req, res) => {
  const {
    firstName, lastName, middleNames,
    addressLineOne, addressLineTwo, addressLineThree, city, country, postCode,
    birthdate,
    email, phoneNumber, emails, phoneNumbers,
    createdBy, updatedBy
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
    createdBy: {
      uuid: req.auth.userUuid,
      name: createdBy
    },
    updatedBy: {
      uuid: req.auth.userUuid,
      name: updatedBy
    }
  });

  // Save client in the database
  client
    .save(client)
    .then(data => {
      // Add the client to the group which was selected
      Group.updateOne({ groupname: req.body.groupname }, { $push: { clients: new ObjectId(data._id) } })
        .then(() => {
          res.status(200).send({
            success: `Client created successfully in ${req.body.groupname}.`
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

// Update a client's sessions
exports.addSession = (req, res) => {

  const { title, description, notes, date } = req.body;

  const newSession = {
    title: title,
    description: description,
    notes: notes,
    date: date
  };

  Client.findOneAndUpdate({ _id: req.body._id }, { $push: { sessions: newSession } })
    .then(client => {
      res.status(200).send({
        sessions: client.sessions
      })
    })
    .catch(err => {
      res.status(401).send({
        message:
          err.message || `Some error occurred while updating sessions for client ${req.body._id}`
      });
    });
}

// Deletes a client by ID
exports.delete = (req, res) => {
  // Update the group clients array to remove this client
  Group.findOneAndUpdate({ groupname: req.body.groupname }, { $pull: { clients: req.body.clientId } })
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