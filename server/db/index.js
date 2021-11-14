const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://pmcglinchey:BXQXwJFeCZ2Xs6J@cluster0.tstzn.mongodb.net/sample_restaurants', { useNewUrlParser: true })
  .catch(e => {
    console.error('Connection error', e.message)
  });

const db = mongoose.connection;

module.exports = db;