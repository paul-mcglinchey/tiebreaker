const db = require('../models');
const Client = db.clients;

// Create and save a new client
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }
  console.log(req.body.firstName);
  // Create a new client
  const client = new Client({
    clientname: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleNames: req.body.middleNames
    },
    address: req.body.address,
    birthdate: req.body.birthdate,
    contactinfo: {
      emails: req.body.emails,
      phoneNumbers: req.body.phoneNumbers
    }
  });

  // Save client in the database
  client
    .save(client)
    .then(data => {
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
exports.findAll = (req, res) => {
  Client.find({}).limit(10).skip(req.query.page * 10)
    .then(data => {
      res.send({
        data
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving clients.'
      });
    });
};

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

// Deletes a client by ID
exports.deleteClient = (req, res) => {
  console.log(req.query)
  Client.findByIdAndRemove(req.query.clientId)
  .then(client => {
    if (!client) {
      return res.status(404).send({
        message: 'Client not found with id ' + req.query.clientId
      });
    };

    res.send({ message: 'Client deleted successfully' });
  }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: 'Client not found with id ' + req.query.clientId
      });
    };
    return res.status(500).send({
      message: 'Could not delete note with id ' + req.query.clientId
    });
  });
}