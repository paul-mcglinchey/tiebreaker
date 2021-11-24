const db = require('../models');
const Account = db.accounts;
const AccountAccess = db.accountsaccess;
const AdminAccount = db.adminaccounts;

// Create and save an Account
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!"
    });
  }
  // Create a new Account
  const account = new Account({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    accessKey: req.body.accessKey
  })

  // Check that the account being created has a valid access key
  const hasAccess = this.authenticateAccess(account);

  // Dont save if access key is invalid
  if (!hasAccess) {
    return res.status(500).send({
      message: 'Invalid access key: ' + req.body.accessKey,
      validAccessKey: false
    })
  }

  // Save account in the database
  account
    .save(account)
    .then(data => {
      data.validAccessKey = true;
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the account.'
      });
    });
};

// Add user access
exports.addAccess = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: 'Content cannot be empty!'
    });
  }
  // Create a new AccountAccess
  const accountAccess = new AccountAccess({
    email: req.body.email,
    accessKey: req.body.accessKey,
    grantedBy: req.body.grantedBy
  })
  // Save accountAccess
  accountAccess
    .save(accountAccess)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating that account access.'
      })
    })
}

// Authenticate a user
exports.authenticate = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  Account.find({ $or: [{ username: req.body.user }, { email: req.body.user }], password: req.body.password })
    .then(account => {
      if (!account) {
        return res.status(404).send({
          message: 'Could not authenticate user: ' + req.body.user,
          authenticated: false
        });
      }

      res.status(200).send({
        message: 'Authenticated user: ' + req.body.user,
        authenticated: true
      })
    })
    .catch(err => {
      res.send({
        message: err.message || 'Some error occurred during authentication.'
      })
    })
}

// Authenticate admin
exports.authenticateAdmin = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: 'Content cannot be empty!'
    });
  }

  console.log(req.body);

  AdminAccount.find({})
    .then(data => {
      console.log(data);
    })
}

// Authenticate account access
exports.authenticateAccess = (account) => {
  AccountAccess.findOne({ email: account.email }, function (err, accountAccess) {
    if (err) throw err;

    // test if the password matches
    accountAccess.comparePassword(account.accessKey, function (err, isMatch) {
      if (err) throw err;
      console.log(account.accessKey, isMatch);
    });
  });
}