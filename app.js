const express = require('express');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const user_routes = require('./routes/user');
const book_routes = require('./routes/book');
const history_routes = require('./routes/history');

try {
  // eslint-disable-next-line no-unused-vars
  const dbconnect = require('./models/databaseconnect');
} catch (err) {
  process.exit(500);
}

dotenv.config();

const app = express();

app.use(body_parser.json());

app.get('/', (req, res)=>{
  console.log('Welcome greet from Server');
  res.send('Hi from Server to Client');
});

app.use('/user', user_routes);
app.use('/book', book_routes);
app.use('/history', history_routes);
app.all('/*', (req, res) => {
  res.send('hi');
});

module.exports = app;
