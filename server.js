const express = require('express');
const bodyParser = require('body-parser');

/* create express app */
const app = express();

/* parse request from application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({extended: true}));

/* parse request from application/json */
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url).then(() => {
  console.log('Successfully connected!');
}).catch(err => {
  console.log('Can\'t connect to the database right now. Exiting...');
  process.exit();
});

/* simple route */
app.get('/', (req, res) => {
  res.json({"message": "Welcome to your dota 2 favorites heroes"});
});

require('./app/routes/hero.routes.js')(app);

app.listen(3000, () => {
  console.log("Server is listening right now");
});
