const express = require('express');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const user_routes = require('./routes/user');
const book_routes = require('./routes/book');
const history_routes = require('./routes/history');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/assignment', {useUnifiedTopology: true, useNewUrlParser: true}, (error)=>{
  if ( error ) {
    console.log('Error while connecting db');
  } else {
    console.log('db connected');
  }
});

mongoose.set('useFindAndModify', false);

const app = express();

app.use(body_parser.json());

app.get('/', (req, res)=>{
  console.log('Welcome greet from Server');
  res.send('Hi from Server to Client');
});

app.use('/user', user_routes);
app.use('/book', book_routes);
app.use('/history', history_routes);

module.exports = app;