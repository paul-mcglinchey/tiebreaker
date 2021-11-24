const express = require('express');
const cors = require('cors');

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

const dbConfig = require('./config/db.config');
const db = require('./models');
const Role = db.role;

db.mongoose
  .connect((process.env.CLIENTS_DB_URL || dbConfig.url) + '/clientbase', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to the database!');
    initial();
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'admin'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      })
    }
  })
}

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))