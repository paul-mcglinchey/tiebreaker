const { ufApiKey } = require('../config/auth.config');
const fetch = require('node-fetch');

exports.getCurrentUser = (req, res) => {
  this.getUser(res, req.auth.userUuid);
}

exports.getUserById = (req, res) => {

  const { userId } = req.params;

  // UPDATE TO USE MIDDLEWARE CHECK
  if (!userId) return res.status(400).send({ message: 'UserID not set' });

  this.getUser(res, userId).then(user => {
    return res.status(200).send(user)
  });
}

// Common functionality
exports.getUser = (res, userId) => {

  return fetch(`https://api.userfront.com/v0/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ufApiKey}`
    }
  })
    .then(response => {
      if (!response.ok) {
        return res.status(response.status).send({ message: response.statusText });
      }
      
      return response.json();
    })
    .catch(err => {
      return res.status(500).send({ message: err.message || `Some error occurred while getting the user.` })
    })
}
