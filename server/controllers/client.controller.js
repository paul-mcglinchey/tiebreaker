const asyncHandler = require('express-async-handler');
const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const ClientGroup = db.clientgroup;
const Client = db.client;
const Session = db.session;

// Read operations

// Retrieve all clients from the database
exports.get = asyncHandler(async (req, res) => {

  let { pageSize, pageNumber, groupId, sortField, sortDirection, name } = req.query;

  pageSize = parseInt(pageSize);
  pageNumber = parseInt(pageNumber);

  if (!pageSize || !pageNumber || !groupId || !sortField || !sortDirection) {
    res.status(400);
    throw new Error(`Request is missing one of the following parameters: pageSize, pageNumber, groupId, sortField, sortDirection.`)
  }

  const group = await ClientGroup.findOne({ _id: groupId, 'accessControl.viewers': req.auth.userUuid })

  if (!group) {
    res.status(400);
    throw new Error(`Group with ID ${groupId} not found.`)
  }

  // all the clients that belong to the requested group
  let clientIds = group.clients;

  // the mongoose query to fetch those clients
  let clientQuery = { _id: { $in: clientIds } };

  // Get the count of documents which match this query
  const clientCount = await Client.countDocuments(clientQuery);

  // create the aggregate object (functions like an IQueryable)
  const aggregate = Client.aggregate();

  // apply a match operator to the pipeline to only return clients for the current group
  // add a new fullName field to filter on
  aggregate
    .match(clientQuery)
    .addFields({ fullName: { $concat: ['$name.firstName', ' ', '$name.lastName'] } });

  // if a filter for the fullName was passed in then use it to apply a match operator to the aggregate
  if (name) {
    aggregate.match({ fullName: { $regex: name, $options: 'i' } });
  }

  // finally build the other query parameters and return the aggregate as the clients queryable
  const clients = await aggregate
    .sort({ [sortField]: (sortDirection == "descending" ? -1 : 1) })
    .skip(((pageNumber || 1) - 1) * pageSize)
    .limit(pageSize)
    .exec()

  return res.status(200).json({
    count: clientCount,
    clients: clients
  });
});

// Retrieve a specific client by Id
exports.getById = asyncHandler(async (req, res) => {
  let { clientId } = req.params;

  if (!clientId) {
    res.status(400)
    throw new Error('A client ID must be provided.')
  }

  // create the aggregator so we can add custom fields
  const aggregate = Client.aggregate();

  const client = await aggregate
    .match({ _id: new ObjectId(clientId) })
    .addFields({ fullName: { $concat: ['$name.firstName', ' ', '$name.lastName'] } })  
    .exec()

  return res.status(200).json(client[0]);
})

// CUD Operations
// Create and save a new client
exports.create = asyncHandler(async (req, res) => {

  const { groupId } = req.query;

  const { 
    name, address, contactInfo, colour, birthdate
  } = req.body;

  const client = await Client.create({
    accessControl: {
      viewers: [req.auth.userUuid], editors: [req.auth.userUuid], owners: [req.auth.userUuid]
    },
    name,
    address,
    birthdate,
    contactInfo,
    colour,
    activityLog: {
      task: "created",
      actor: req.auth.userUuid
    },
    createdBy: req.auth.userUuid,
    updatedBy: req.auth.userUuid
  })

  // Check that the newly created client has an _id
  if (!client._id) {
    throw new Error('Something went wrong creating the client.')
  }

  // Update the clientgroup with the newly added client
  await ClientGroup.findByIdAndUpdate(groupId, { $push: { clients: new ObjectId(client._id) } });

  return res.status(201).json(client);
});

// Update a client
exports.update = asyncHandler(async (req, res) => {
  const { clientId } = req.params;

  if (!clientId) {
    res.status(200)
    throw new Error('Request is missing a client ID.')
  }

  const updateBody = req.body.updateBody;
  updateBody.activityLog.push({
    task: "updated",
    actor: req.auth.userUuid
  })
  
  const client = Client.findByIdAndUpdate(clientId, updateBody);

  return res.status(200).json(client);
})

// Add a session to a specific client
exports.addSession = asyncHandler(async (req, res) => {

  const { clientId } = req.params;
  const { title, description, tags, sessionDate } = req.body;

  if (!clientId || !title || !sessionDate) {
    res.status(400)
    throw new Error('Request must have all of the following: client ID, title, session date')
  }

  const session = await Session.create({
    title, description, tags, sessionDate,
    createdBy: req.auth.userUuid,
    updatedBy: req.auth.userUuid
  });

  if (!session._id) throw new Error('Something went wrong creating the session.')

  await Client.findByIdAndUpdate(
    clientId, { 
      $push: { sessions: session._id },
      $push: { activityLog: {
        task: "added session",
        actor: req.auth.userUuid
      }}
    });

  return res.status(200).json(session)
})

// Deletes a client by ID
exports.delete = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  const { groupId } = req.query;

  if (!clientId || !groupId) {
    res.status(400)
    throw new Error('Request requires both a client and group ID.')
  }

  // Soft delete the client (remove from group)
  await ClientGroup.findByIdAndUpdate(groupId, { $pull: { clients: clientId }});

  return res.status(200).json({ message: 'Deleted client' }); 
})