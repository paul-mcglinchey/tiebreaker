const { ufApiKey } = require('../config/auth.config');
const fetch = require('node-fetch');

exports.getCurrentUser = async (req, res) => {
  // Request current user data from Userfront
  fetch(`https://api.userfront.com/v0/users/${req.auth.userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ufApiKey}`
    }
  })
    .then(res => res.json())
    .then(json => res.status(200).send(json))
    .catch(err => {
      res.status(500).send(err.message || `Some error occurred while getting the current group.`)
    })
}