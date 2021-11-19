const db = require('../models');
const Client = db.clients;

// Create and save a new client
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a client
  const client = new Client();
  client.clientname.firstName = req.body.firstName;
  client.clientname.lastName = req.body.lastName;
  client.clientname.middleNames = client.clientname.middleNames.concat(req.body.middleNames);

  client.address = req.body.address;
  client.birthdate = req.body.birthdate;

  client.contactinfo.emails = client.contactinfo.emails.concat(req.body.emails);
  client.contactinfo.phoneNumbers = client.contactinfo.phoneNumbers.concat(req.body.phoneNumbers);

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

// Retrieve all tutorials from the database
exports.findAll = (req, res) => {
  Client.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    });
};