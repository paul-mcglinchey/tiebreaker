const express     = require('express');
const dotenv      = require('dotenv').config();
const cors        = require('cors');
const middleware  = require('./middlewares');

const app     = express();
const PORT    = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Welcome to the tiebreaker clients API')
})

app.get('/health', (req, res) => {
  res.json({
    appName: 'tiebreaker-clients-api',
    version: process.env.npm_package_version,
    status: 'OK',
  });
});

console.log(`Attempting to connect to the tiebreaker database on ${process.env.TIEBREAKER_DB_URL}`)

const db = require('./models');
db.mongoose
  .connect((process.env.TIEBREAKER_DB_URL) + '/' + (process.env.DB_NAME || 'tiebreaker'), {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to the tiebreaker database!');
  })
  .catch(err => {
    console.log('Cannot connect to the tiebreaker database!', err);
    process.exit();
  });

// Unprotected routes
require('./routes/user.routes')(app);

// Auth
app.use(middleware.authMiddleware.protect);

// routes
require('./routes/grouplist.routes')(app);

app.use('/api/clientgroups', require('./routes/clientgroup.routes'))
app.use('/api/rotagroups', require('./routes/rotagroup.routes'))

app.use(middleware.errorMiddleware.errorHandler);

// Seed Default List Definitions
const grouplistController = require('./controllers/grouplist.controller');
grouplistController.createDefaultLists();

// Seed permissions
const permissionController = require('./controllers/permission.controller')
permissionController.createPermissions();

// get the current time to display on restarts of the server
var currentDateTime = new Date();
var currentTime = currentDateTime.getUTCHours() + ':' + currentDateTime.getUTCMinutes();

// set port, listen for requests
app.listen(PORT, () => console.log(`Server running on port ${PORT} in environment ${process.env.NODE_ENV} @ ${currentTime}`))