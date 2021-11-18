const Restaurant = require('../models/restaurant-model');

getRestaurants = async (req, res) => {
  await Restaurant.find({}, (err, restaurants) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!restaurants.length) {
      return res
        .status(404)
        .json({ success: false, error: `Restaurant not found` })
    }
    return res.status(200).json({ success: true, data: restaurants })
  })
    .limit(50)
    .clone()
    .catch(
      err => console.log(err)
    )
}

getCuisines = async (req, res) => {
  await Restaurant.find({}, { cuisine: 1, _id: 0 }, (err, cuisines) => {
    if (err) {
      return res.status(400).json({ success: false, error: err})
    }
    if (!cuisines.length) {
      return res
        .status(404)
        .json({ success: false, error: `Restaurant not found` })
    }
    return res.status(200).json({ success: true, data: cuisines })
  })
    .distinct('cuisine')
    .clone()
    .catch(
      err => console.log(err)
    )
}

module.exports = {
  getRestaurants,
  getCuisines
}