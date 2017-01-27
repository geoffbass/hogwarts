const express = require('express');
const app = express();

const db = require('./models');

const volleyball = require('volleyball');
app.use(volleyball);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to Hogwarts'));

app.use('/houses', require('./routes/houses'));
app.use('/students', require('./routes/students'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500)
  .send(err.message || 'Oops. Something went wrong.');
});

db.sync()
.then(() => {
  console.log('db synced');
  app.listen('1701', () => console.log('listening on 1701'));
});
