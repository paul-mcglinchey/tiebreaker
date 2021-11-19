const express = require('express');
const cors = require('cors');

const restaurant_db = require('./db');
const customerRouter = require('./routes/customer-router')

const app = express();
const apiPort = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

restaurant_db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/health', (req, res) => {
  res.status(200).json({
    appName: 'clientsplash-api',
    version: process.env.npm_package_version,
    status: 'OK',
  });
});

app.use('/api', customerRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))