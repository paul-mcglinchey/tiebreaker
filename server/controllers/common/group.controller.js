const asyncHandler    = require('express-async-handler');
const db              = require('../../models');
const GroupList       = db.grouplist;

// Get all groups
exports.get = (Model) => {
  return asyncHandler(async (req, res) => {

    // the mongoose query to fetch the groups for the current user
    let groupQuery = { 'accessControl.viewers': req.auth.userId };

    const count = await Model.countDocuments(groupQuery)
    const groups = await Model.find(groupQuery)

    return res.status(200).json({
      count: count,
      groups: groups
    });
  })
}

// Create group
exports.create = (Group) => {
  return asyncHandler(async (req, res) => {
    // destructure the body
    const { name, description, colour } = req.body

    // get the ID of the default list set to create the group with
    const defaultListsId = await GroupList
      .find({ default: true })
      .then(defaultLists => defaultLists._id)
    
    const group = await Group.create({
      name, description, colour,
      accessControl: {
        viewers: [req.auth.userId],
        editors: [req.auth.userId],
        owners: [req.auth.userId]
      },
      listDefinitions: [defaultListsId],
    })

    return res.status(201).json(group)
  })
}

// Update group
exports.update = (Group) => {
  return asyncHandler(async (req, res) => {
    const { groupId } = req.params

    const group = await Group.findByIdAndUpdate(groupId, req.body)

    return res.status(200).json(group)
  })
}

// Delete group
exports.delete = (Group, cleanupFunction) => {
  return asyncHandler(async (req, res) => {
    const { groupId } = req.params

    const group = await Group.findOne(groupId)

    if (!group) {
      res.status(400)
      throw new Error('Group not found')
    }

    await group.remove()

    await cleanupFunction(group)
    
    return res.json({ message: 'Deleted group' })
  })
}