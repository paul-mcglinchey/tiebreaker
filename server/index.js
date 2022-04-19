const express     = require('express');
const dotenv      = require('dotenv').config();
const cors        = require('cors');
const middleware  = require('./middlewares');

const app     = express();
const PORT    = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (res) => {
  res.send('Welcome to the tiebreaker clients API')
})

app.use('/health', (res) => {
  res.status(200).json({
    appName: 'tiebreaker-clients-api',
    version: process.env.npm_package_version,
    status: 'OK',
  });
});

const dbConfig = require('./config/db.config');
const db = require('./models');

db.mongoose
  .connect((dbConfig.url) + '/' + (process.env.DB_NAME || 'tiebreaker'), {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to the tiebreaker database!');
  })
  .catch(err => {
    console.log('Cannot connect to the tiebreaker database!', err);
    process.exit();
  });

// Auth
app.use(middleware.authMiddleware.verifyToken);

// routes
require('./routes/client.routes')(app);
require('./routes/clientgroup.routes')(app);
require('./routes/employee.routes')(app);
require('./routes/rota.routes')(app);
require('./routes/rotagroup.routes')(app);
require('./routes/user.routes')(app);
require('./routes/grouplist.routes')(app);

app.use(middleware.errorMiddleware.errorHandler);

// Check if a default grouplist exists, if not we need to create one
const grouplistController = require('./controllers/grouplist.controller');
grouplistController.createDefaultLists();

// get the current time to display on restarts of the server
var currentDateTime = new Date();
var currentTime = currentDateTime.getUTCHours() + ':' + currentDateTime.getUTCMinutes();

// set port, listen for requests
app.listen(PORT, () => console.log(`Server running on port ${PORT} in environment ${process.env.NODE_ENV || 'dev'} @ ${currentTime}`))