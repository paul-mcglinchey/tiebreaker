const express = require('express');
const cors = require('cors');
const middleware = require('./middlewares');

const app = express();
const apiPort = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the clientsplash API')
})

app.use('/health', (req, res) => {
  res.status(200).json({
    appName: 'clientsplash-api',
    version: process.env.npm_package_version,
    status: 'OK',
  });
});

const user = require('./controllers/user.controller');
app.use('/api/configureuser', user.configureUser);

const dbConfig = require('./config/db.config');
const db = require('./models');

db.mongoose
  .connect((dbConfig.url) + '/clientbase', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// Auth
app.use(middleware.authJwt.verifyToken);
app.use(middleware.authJwt.getUserId);

// routes
require('./routes/client.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))