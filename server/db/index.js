const mongoose = require('mongoose');
const DB_URL = process.env.SAMPLE_DB_URL || 'mongodb+srv://pmcglinchey:BXQXwJFeCZ2Xs6J@cluster0.tstzn.mongodb.net';

mongoose
  .connect(`${DB_URL}/sample_analytics`, { useNewUrlParser: true })
  .catch(e => {
    console.error('Connection error', e.message)
  });

const analytics_db = mongoose.connection;

module.exports = analytics_db;