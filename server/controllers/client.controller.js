const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const Group = db.group;
const Client = db.client;

// Read operations
// Get the maximum number of pages of clients
exports.maxNumberOfPages = (req, res) => {
  Client.find({})
    .then(data => {
      res.send({
        maxPagesClients: Math.floor(data.length / 10)
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retrieving number of clients.'
      })
    })
}

// Retrieve all clients from the database
exports.findAll = (req, res, next) => {
  Group.findOne({ groupname: req.query.userGroup })
    .then(group => {
      let clientIds = group.clients;
      Client.find({ _id: { $in: clientIds } })
        .then(clients => {
          res.status(200).send({
            data: clients
          })
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'A problem occurred fetching clients.'
          })
        })
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
  // Create a new client
  const client = new Client({
    clientName: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleNames: req.body.middleNames.split(" ")
    },
    address: {
      firstLine: req.body.addressLineOne,
      secondLine: req.body.addressLineTwo,
      thirdLine: req.body.addressLineThree,
      city: req.body.city,
      country: req.body.country,
      postCode: req.body.postCode
    },
    birthdate: req.body.birthdate,
    contactinfo: {
      primaryEmail: req.body.email,
      primaryPhoneNumber: req.body.phoneNumber,
      emails: req.body.emails,
      phoneNumbers: req.body.phoneNumbers
    },
    sessions: []
  });

  // Save client in the database
  client
    .save(client)
    .then(data => {
      // Add the client to the group which was selected
      Group.updateOne({ groupname: req.body.userGroup }, { $push: { clients: new ObjectId(data._id) } })
        .then(() => {
          res.status(200).send({
            success: 'Client created successfully.'
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

  const newSession = {
    title: req.body.title,
    description: req.body.description,
    notes: req.body.notes,
    date: req.body.date
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
  Group.findOneAndUpdate({ groupname: req.body.userGroup }, { $pull: { clients: req.body.clientId } })
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