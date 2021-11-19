const Customer = require('../models/customer-model');

getCustomers = async (req, res) => {
  await Customer.find({}, (err, customers) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!customers.length) {
      return res
        .status(404)
        .json({ success: false, error: `Customer not found` })
    }
    return res.status(200).json({ success: true, data: customers })
  })
    .limit(50)
    .clone()
    .catch(
      err => console.log(err)
    )
}

module.exports = {
  getCustomers
}