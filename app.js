/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const express = require('express');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const user_routes = require('./routes/user');
const book_routes = require('./routes/book');
const history_routes = require('./routes/history');
const {response} = require('./response/response');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors());
app.use(body_parser.json());

app.use('/user', user_routes);
/**
 * Book Routes
 */
app.use('/book', book_routes);
/**
 * History Routes
 */
app.use('/history', history_routes);
/**
 * All other api hits
 */
app.all('/*', (req, res) => {
  return response(null, [], 'Wrong Api Hit', res);
});
/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  return response(err, null, err.message, res);
});

module.exports = app;
