const errorHandler = (err, req, res, next) => {
  const code = res.statusCode

  res.status((code && code !== 200) ? code : 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  })
}

module.exports = {
  errorHandler
}