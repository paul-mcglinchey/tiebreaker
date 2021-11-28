const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const Group = db.group;
const Client = db.client;

// Create and save a new client
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }
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
      primaryPhoneNumber: req.body.phoneNumber
    },
    sessions: []
  });

  // Save client in the database
  client
    .save(client)
    .then(data => {
      Group.updateOne({ groupname: req.body.groupname }, { $push: { clients: new ObjectId(data._id) } })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Could not add the client to this group.'
          })
        })
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the client.'
      });
    });
};
// Retrieve all clients from the database
exports.findAll = (req, res, next) => {
  Group.findOne({ groupname: req.query.groupname })
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
      res.status(500).send({
        message:
          err.message || 'A problem occurred fetching clients.'
      });
    });
};

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

// Update a client's sessions
exports.addSession = (req, res) => {

  const newSession = { title: req.body.title, description: req.body.description, notes: req.body.notes, date: req.body.date };

  Client.findOneAndUpdate({ _id: req.body._id }, { $push: { sessions: newSession } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    });
}

// Deletes a client by ID
exports.deleteClient = (req, res) => {
  // Delete the client from it's group
  Group.findOneAndUpdate({ groupname: req.body.groupname }, { $pull: { _id: new ObjectId(req.query.clientId)}})
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