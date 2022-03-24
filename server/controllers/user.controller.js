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

exports.updateUserDefaultGroup = async (req, res) => {
  // get the group type from the query params
  const { groupType } = req.params;

  // Set the defaultGroup field of the current user
  this.setUserDefaultGroup(req.auth.userId, groupType, req.body._id)
    .then(response => {
      if (response.status === 400) return res.status(400).send(`Bad request.`);
      if (response.status !== 200) return res.status(500).send(`Server error.`);

      return response.json();
    })
    .then(json => res.status(200).send(json))
    .catch(err => {
      res.status(500).send(err.message || `Some error occurred while setting the default group.`)
    })
}

exports.setUserDefaultGroup = (userId, groupType, groupId) => {
  return fetch(`https://api.userfront.com/v0/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ufApiKey}`
    },
    body: JSON.stringify({
      data: {
        [groupType]: groupId
      }
    })
  })
}