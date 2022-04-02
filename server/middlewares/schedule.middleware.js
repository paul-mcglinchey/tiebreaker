const checkQueryHasDate = (req, res, next) => {
  if (!req.params.startDate) return res.status(400).send({ message: 'A start date must be supplied.'});
  next();
}

module.exports = {
  checkQueryHasDate
}