const express = require('express')

const RestaurantController = require('../controllers/restaurant-controller')

const router = express.Router()

router.get('/restaurants', RestaurantController.getRestaurants)

module.exports = router