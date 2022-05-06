const ObjectId = require('mongoose').Types.ObjectId
const asyncHandler = require('express-async-handler')
const db = require('../models')
const Rota = db.rota
const Schedule = db.schedule
const Employee = db.employee

// Retrieve all schedules for a rota
exports.get = asyncHandler(async (req, res) => {
  const { rotaId } = req.params;

  const rota = await Rota.findById(rotaId)

  if (!rota) {
    res.status(400)
    throw new Error('Rota not found')
  }

  const query = { _id: { $in: rota.schedules }}

  const count = await Schedule.countDocuments(query)
  const schedules = await Schedule.find(query)

  res.json({ count, schedules })
})

exports.updateEmployees = (res, rota, schedule) => {
  let current = new Date();
  let scheduleStartDate = new Date(schedule.startDate);

  if (scheduleStartDate > current.setDate(current.getDate() - 7)) {
    if (!schedule.locked) {
      // get the employees which exist in the rota but not on the current schedule
      let scheduleEmployees = schedule.employeeSchedules.map(es => String(es.employeeId));
      let missingEmployees = rota.employeeIds.filter(rid => !scheduleEmployees.includes(String(rid)))

      // Add the missing employees to the schedule
      missingEmployees.forEach(eId => schedule.employeeSchedules.push({ employeeId: eId }));
    }
  } else {
    if (!schedule.locked) {
      // lock the schedule as it's in the past
      schedule.locked = true;
    }
  }

  return schedule.save()
    .then(schedule => schedule)
    .catch(err => {
      return res.status(500).send({ message: err.message || `A problem occurred while updating the schedule with ID ${schedule._id}.` })
    })
}

exports.joinEmployees = (res, schedule) => {
  return Employee.find({ _id: { $in: schedule.employeeSchedules.map(es => es.employeeId) } })
    .then(employees => {
      let employeeSchedules = schedule.employeeSchedules.map(es => {
        es.employee = employees.filter(e => String(e._id) === String(es.employeeId))[0];
        return es;
      });

      schedule.employeeSchedules = employeeSchedules;

      return schedule;
    })
    .catch(err => {
      return res.status(500).send({ message: err.message || `A problem occurred while fetching employee data for the schedule.` })
    })
}

// Create and save a new schedule
exports.create = asyncHandler(async (req, res) => {
  const { rotaId } = req.params;

  // Create a new schedule
  const schedule = await Schedule.create({
    ...req.body,
    audit: {
      createdBy: req.auth._id,
      updatedBy: req.auth._id
    }
  });

  if (!schedule) throw new Error('Problem occurred creating schedule')

  await Rota.findByIdAndUpdate(rotaId, { $push: { schedules: new ObjectId(schedule._id) }})

  res.status(201).json(schedule)
})

// Update a schedule
exports.update = asyncHandler(async (req, res) => {
  const { scheduleId } = req.params

  const schedule = await Schedule.findByIdAndUpdate(scheduleId, {
    ...req.body,
    audit: {
      updatedBy: req.auth._id
    }
  }, { new: true })

  if (!schedule) throw new Error('Problem occurred updating schedule')

  return res.json(schedule)
})