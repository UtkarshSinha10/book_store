const express = require('express');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const user_routes = require('./routes/user');
const book_routes = require('./routes/book');
const history_routes = require('./routes/history');
const {response} = require('./response/response');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerJsdoc = import('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();
// const specs = swaggerJsdoc(options);
app.use(body_parser.json());

/**
 * User Routes
 */
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
