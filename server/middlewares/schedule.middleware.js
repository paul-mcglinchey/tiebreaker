const asyncHandler = require('express-async-handler')

const checkQueryHasDate = asyncHandler(async (req, res, next) => {
  if (!req.params.startDate) {
    res.status(400)
    throw new Error('Request requires a schedule start date')
  }

  next();
})

module.exports = {
  checkQueryHasDate
}