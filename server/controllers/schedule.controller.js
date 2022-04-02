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
        .then(async schedule => {
          if (!schedule) {
            // Automatically create a new schedule for this date if it doesn't exist
            const employees = await Employee.find({ _id: { $in: rota.employeeIds } })
              .then(employees => employees)
              .catch(err => res.status(500).send({ message: err || 'A problem occurred while creating a new schedule.' }))

            const scheduleEmployees = employees.map(e => {
              return {
                employee: e,
                shifts: []
              }
            });

            // Create a new schedule
            const schedule = new Schedule({
              startDate: startDate,
              employees: scheduleEmployees,
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
                  .then(() => res.status(200).send({ schedule }))
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
            return res.status(200).send({ schedule });
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
        message:
          err.message || `A problem occurred finding rota with ID ${rotaId}.`
      });
    });
};

// Create and save a new schedule
exports.addSchedule = (req, res) => {

  const { rotaId } = req.params;
  const { startDate, employees } = req.body;

  // Create a new schedule
  const schedule = new Schedule({
    startDate: startDate,
    employees: employees,
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