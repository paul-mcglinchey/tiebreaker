const asyncHandler        = require('express-async-handler');
const ObjectId            = require('mongoose').Types.ObjectId;
const db                  = require('../models');
const Group         = db.group;
const Client              = db.client;
const Session             = db.session;

// Retrieve all clients from the database
exports.get = (includeDeleted) => {
  return asyncHandler(async (req, res) => {
    const { groupId } = req.params
    const { sortField, sortDirection, name } = req.query

    const pageSize = parseInt(req.query.pageSize)
    const pageNumber = parseInt(req.query.pageNumber)

    if (!pageSize || !groupId || !sortField || !sortDirection) {
      res.status(400);
      throw new Error(`Request is missing one of the following parameters: pageSize, groupId, sortField, sortDirection.`)
    }

    const group = await Group.findById(groupId)
    if (!group) {
      res.status(404);
      throw new Error(`Group with ID ${groupId} not found.`)
    }
    
    const query = includeDeleted ? { _id: { $in: group.entities.clients }} : { _id: { $in: group.entities.clients }, deleted: false }
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
})};

// Retrieve a specific client by Id
exports.getById = asyncHandler(async (req, res) => {
  let { clientId } = req.params;

  const client = await Client
    .aggregate()
    .match({ _id: new ObjectId(clientId) })
    .addFields({ fullName: { $concat: ['$name.firstName', ' ', '$name.lastName'] } })  
    .exec()

  if (client.length === 0 ) {
    res.status(400)
    throw new Error('Client not found')
  }

  return res.status(200).json(client[0]);
})

// Create and save a new client
exports.create = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const client = await Client.create({
    ...req.body,
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

  // Update the group with the newly added client
  await Group.findByIdAndUpdate(groupId, { $push: { 'entities.clients': new ObjectId(client._id) } });

  return res.status(201).json(client);
});

// Update a client
exports.update = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  
  const client = Client.findByIdAndUpdate(clientId, {
    ...req.body,
    $push: { activityLog: { task: "updated", actor: req.auth._id }},
    'audit.updatedBy': req.auth._id
  });

  return res.status(200).json(client);
})

// Add a session to a specific client
exports.addSession = asyncHandler(async (req, res) => {
  const { clientId } = req.params;

  const session = await Session.create({
    ...req.body,
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  });

  if (!session._id) throw new Error('Problem occurred creating session')

  await Client.findByIdAndUpdate(
    clientId, { 
      $push: { sessions: session._id },
      $push: { activityLog: { task: "added session", actor: req.auth._id }},
      'audit.updatedBy': req.auth._id
    });

  return res.status(201).json(session)
})

// Deletes a client by ID
exports.delete = asyncHandler(async (req, res) => {
  const { clientId } = req.params
  
  const client = await Client.findById(clientId)

  if (!client) {
    res.status(400)
    throw new Error('Client not found')
  }
  
  // Soft delete the client
  await client.update({ deleted: true })

  return res.json({ _id: client._id, message: 'Deleted client' });
})