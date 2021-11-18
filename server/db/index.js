const mongoose = require('mongoose');
const dev_db_url = 'mongodb+srv://pmcglinchey:BXQXwJFeCZ2Xs6J@cluster0.tstzn.mongodb.net/sample_restaurants';

mongoose
  .connect(process.env.MONGODB_URI || dev_db_url, { useNewUrlParser: true })
  .catch(e => {
    console.error('Connection error', e.message)
  });

const db = mongoose.connection;

module.exports = db;