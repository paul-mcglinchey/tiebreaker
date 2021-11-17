const express = require('express');
const cors = require('cors');

const db = require('./db');
const restaurantRouter = require('./routes/restaurant-router')

const app = express();
const apiPort = 3001;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', restaurantRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))