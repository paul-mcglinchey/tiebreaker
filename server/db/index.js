const mongoose = require('mongoose');
const DB_URL = process.env.SAMPLE_DB_URL || 'mongodb+srv://pmcglinchey:BXQXwJFeCZ2Xs6J@cluster0.tstzn.mongodb.net';

mongoose
  .connect(`${DB_URL}/sample_restaurants`, { useNewUrlParser: true })
  .catch(e => {
    console.error('Connection error', e.message)
  });

const restaurant_db = mongoose.connection;

module.exports = restaurant_db;