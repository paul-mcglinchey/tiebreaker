const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const Rota = db.rota;
const Schedule = db.schedule;
const { Employee } = db.employee;

// Retrieve all schedules for a rota
exports.getScheduleByDate = (req, res) => {

  const { rotaId, startDate } = req.params;

  Rota.findOne({ _id: rotaId, 'accessControl.viewers': req.auth.userUuid })
    .then((rota) => {

      const scheduleIds = rota.schedules;

      Schedule.findOne({ _id: { $in: scheduleIds }, startDate: new Date(startDate) })
        .then(schedule => {
          if (!schedule) {
            // Check if the schedule being requested is in the past
            let currentDate = new Date();

            console.log(new Date(startDate), new Date(currentDate.setDate(currentDate.getDate() - 7)))
            if (new Date(startDate) < currentDate.setDate(currentDate.getDate() - 7)) return res.status(200).send({ message: `No schedule found with start date ${startDate}.` })

            // Automatically create a new schedule for this week if it doesn't exist
            const employeeSchedules = rota.employeeIds.map(e => {
              return {
                employeeId: e,
                shifts: []
              }
            });

            // Create a new schedule
            const schedule = new Schedule({
              accessControl: {
                viewers: [req.auth.userUuid], editors: [req.auth.userUuid], owners: [req.auth.userUuid]
              },
              startDate: new Date(startDate),
              employeeSchedules: employeeSchedules,
              createdBy: req.auth.userUuid,
              updatedBy: req.auth.userUuid
            });

            // Save schedule in the database
            schedule
              .save(schedule)
              .then(schedule => {
                // Add the schedule to the rota which was selected
                Rota.updateOne({
                  _id: rotaId,
                  $or: [{ 'accessControl.editors': req.auth.userUuid }, { 'accessControl.owners': req.auth.userUuid }]
                }, {
                  $push: { schedules: new ObjectId(schedule._id) }
                })
                  .then(() => {
                    this.joinEmployees(res, schedule).then(schedule => res.status(200).send({ rota, schedule }))
                  })
                  .catch(err => {
                    return res.status(500).send({
                      message:
                        err.message || `A problem occurred adding schedule to rota with ID ${rotaId}.`
                    })
                  })
              })
              .catch(err => {
                return res.status(500).send({
                  message:
                    err.message || `Some error occurred while creating the schedule.`
                });
              });
          } else {
            this.updateEmployees(res, rota, schedule).then(schedule => {
              // Joining the employee data to the schedules, this will keep the employees up to date even when the schedule is in the past
              this.joinEmployees(res, schedule).then(schedule => res.status(200).send({ rota, schedule }))
            });
          }
        })
        .catch(err => {
          return res.status(500).send({
            message: err.message || `A problem occurred fetching the schedule from rota with ID ${rotaId}.`
          })
        })
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || `A problem occurred finding rota with ID ${rotaId}.`
      });
    });
};

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

// Update a schedule
exports.updateSchedule = (req, res) => {
  const { rotaId, startDate } = req.params;

  Rota.findOne({ _id: rotaId, 'accessControl.editors': req.auth.userUuid })
    .then(rota => {

      const scheduleIds = rota.schedules;
      Schedule.updateOne({ _id: { $in: scheduleIds }, startDate: new Date(startDate) }, req.body)
        .then(update => {
          return res.status(200).send({ message: `Matched ${update.matchedCount} schedules, updated ${update.modifiedCount} schedules for rota with ID ${rotaId}.` })
        })
        .catch(err => {
          return res.status(500).send({
            message: err.message || `A problem occurred updating schedule for rota with ID ${rotaId}.`
          })
        })
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || `A problem occurred finding rota with ID ${rotaId}.`
      })
    })
}

// Create and save a new schedule
exports.addSchedule = (req, res) => {

  const { rotaId } = req.params;
  const { startDate, employeeSchedules } = req.body;

  // Create a new schedule
  const schedule = new Schedule({
    startDate: startDate,
    employeeSchedules: employeeSchedules,
    createdBy: req.auth.userUuid,
    updatedBy: req.auth.userUuid
  });

  // Save schedule in the database
  schedule
    .save(schedule)
    .then(schedule => {
      // Add the schedule to the rota which was selected
      Rota.updateOne({
        _id: rotaId,
        $or: [{ 'accessControl.editors': req.auth.userUuid }, { 'accessControl.owners': req.auth.userUuid }]
      }, {
        $push: { schedules: new ObjectId(schedule._id) }
      })
        .then(() => {
          return res.status(200).send({
            success: `Schedule created successfully in rota with ID ${rotaId}.`
          })
        })
        .catch(err => {
          return res.status(500).send({
            message:
              err.message || `A problem occurred adding schedule to rota with ID ${rotaId}.`
          })
        })
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || `Some error occurred while creating the schedule.`
      });
    });
};