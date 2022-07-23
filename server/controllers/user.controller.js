const asyncHandler        = require('express-async-handler')
const jwt                 = require('jsonwebtoken')
const bcrypt              = require('bcryptjs')
const db                  = require('../models')
const User                = db.user
const Group               = db.group

exports.getById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // UPDATE TO USE MIDDLEWARE CHECK
  if (!userId) {
    res.status(400)
    throw new Error('Request requires a user ID')
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404)
    throw new Error('Resource not found')
  }

  res.json(user)
})

exports.getGroupUsers = asyncHandler(async (req, res) => {
  const { groupId } = req.params

  const group = await Group.findById(groupId)

  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }

  const query = { _id: { $in: group.users.map(u => u.user) }}
  const count = await User.countDocuments(query)
  const users = await User.find(query).select('-password')

  return res.json({ count, users })
})

// @desc    Get current user data
// @route   GET /api/users/current
// @access  Private
exports.getCurrent = (req, res) => {
  console.log(req.auth)
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    {id}, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '30d'
    }
  )
}

const generateUser = (user) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
    isAdmin: user.isAdmin,
    preferences: user.preferences
  }
}

exports.authenticate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.auth._id).select('-password')

  if (!user) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  res.json(generateUser(user))
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body

  if (!(email || username) || !password) {
    res.status(400)
    throw new Error('Request requires a username/email and password')
  }

  // Check for a user based on either the email or username
  const user = await User.findOne({ $or: [{ username: username }, { email: email }] })

  if (!user) {
    res.status(400)
    throw new Error('User doesn\'t exist')
  }

  if (await bcrypt.compare(password, user.password)) {
    res.json(generateUser(user))
  } else {
    res.status(401)
    throw new Error('Unable to authenticate user')
  }
})

// @desc    Signup a new user
// @route   POST /api/users
// @access  Public
exports.signup = asyncHandler(async (req, res) => {

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Request requires the following fields: username, email, password')
  }

  // Check if the user exists
  const userExists = await User.findOne({ $or: [{ username: username }, { email: email }] });

  if (userExists) {
    res.status(400)
    throw new Error('User already exists.');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    res.status(201).json(generateUser(user))
  } else {
    res.status(400)
    throw new Error('A problem occurred while signing up the user')
  }
})

exports.update = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    ...req.body,
    'audit.updatedBy': req.auth._id
  })

  return res.status(200).json(user)
})