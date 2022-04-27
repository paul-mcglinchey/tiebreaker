const asyncHandler = require('express-async-handler')

const checkIfQueryHasScheduleId = asyncHandler(async (req, res, next) => {
  if (!req.params.scheduleId) {
    res.status(400)
    throw new Error('Request requires schedule ID')
  }

  next();
})

module.exports = {
  checkIfQueryHasScheduleId
}