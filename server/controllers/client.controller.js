const asyncHandler = require('express-async-handler');
const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const Group = db.group;
const Client = db.client;
const Session = db.session;

// Retrieve all clients from the database
exports.get = asyncHandler(async (req, res) => {
  const { sortField, sortDirection, name } = req.query

  const pageSize = parseInt(req.query.pageSize)
  const pageNumber = parseInt(req.query.pageNumber)

  if (!pageSize || !sortField || !sortDirection) {
    res.status(400);
    throw new Error(`Request is missing parameters.`)
  }

  const query = { groupId: new ObjectId(req.params.groupId), deleted: false }
  // Get the count of documents which match this query
  const count = await Client.countDocuments(query);

  // apply a match operator to the pipeline to only return clients for the current group
  // add a new fullName field to filter on
  const clients = await Client.aggregate()
    .match(query)
    .addFields({ fullName: { $concat: ['$name.firstName', ' ', '$name.lastName'] } })
    .match(name ? { fullName: { $regex: name, $options: 'i' } } : {})
    .sort({ [sortField]: (sortDirection === "descending" ? -1 : 1) })
    .skip(((pageNumber || 1) - 1) * pageSize)
    .limit(pageSize)
    .exec()

  return res.status(200).json({
    count: count,
    clients: clients
  });
});

// Retrieve a specific client by Id
exports.getById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.clientId)

  if (!client) {
    res.status(404)
    throw new Error('Resource not found')
  }

  return res.status(200).json(client);
})

// Create and save a new client
exports.create = asyncHandler(async (req, res) => {
  const client = await Client.create({
    ...req.body,
    groupId: req.params.groupId,
    activityLog: {
      task: "created",
      actor: req.auth._id
    },
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  })

  if (!client) throw new Error('Problem occurred creating client')

  return res.status(201).json(client);
});

// Update a client
exports.update = asyncHandler(async (req, res) => {
  const client = Client.findByIdAndUpdate(req.params.clientId, {
    ...req.body,
    $push: { activityLog: { task: "updated", actor: req.auth._id } },
    'audit.updatedBy': req.auth._id
  });

  return res.status(200).json(client);
})

// Add a session to a specific client
exports.addSession = asyncHandler(async (req, res) => {
  const session = await Session.create({
    ...req.body,
    clientId: req.params.clientId,
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  });

  if (!session._id) throw new Error('Problem occurred creating session')

  await Client.findByIdAndUpdate(clientId, {
    $push: { sessions: session._id },
    $push: { activityLog: { task: "added session", actor: req.auth._id } },
    'audit.updatedBy': req.auth._id
  });

  return res.status(201).json(session)
})

// Deletes a client by ID
exports.delete = asyncHandler(async (req, res) => {
  // Soft delete the client
  const client = await Client.findByIdAndUpdate(req.params.clientId, {
    deleted: true,
    'audit.updatedBy': req.auth._id,
    $push: { activityLog: { task: "deleted", actor: req.auth._id } }
  })

  return res.json({ _id: client._id, message: 'Deleted client' });
})