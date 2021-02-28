/* eslint-disable max-len */
const express = require('express');
const history_controller = require('../controllers/history');
const authorize = require('../middlewares/authorization/authorize');
const validator = require('../middlewares/validations/validator');

// eslint-disable-next-line new-cap
const routes = express.Router();

// API 5
routes.get('/amountspent', authorize.authorization, validator.new_admin_validator, history_controller.amount_spent);

// API 10
routes.get('/rentedbooks', authorize.authorization, history_controller.rented_books);

// API 9
routes.post('/rentbooks', authorize.authorization, validator.book_id_array_validator, history_controller.rent_books);

// API 6 rented books by user
routes.get('/bookstouser', authorize.authorization, validator.new_admin_validator, history_controller.rented_books_to_user);

// API 15 return books
routes.put('/returnbooks', authorize.authorization, validator.book_id_array_validator, history_controller.return_books);
module.exports = routes;
