/* eslint-disable max-len */
const express = require('express');
const book_controller = require('../controllers/book');
const authorize = require('../middlewares/authorization/authorize');
const validator = require('../middlewares/validations/validator');

// eslint-disable-next-line new-cap
const routes = express.Router();

// API 3
routes.post('/new', authorize.authorization, validator.new_book_validator, book_controller.new_book);

// API 4
routes.post('/update', authorize.authorization, validator.book_update_validator, book_controller.update_book);

// API 8
routes.get('/genre', authorize.authorization, book_controller.book_by_genre);

// API 11
routes.get('/author', authorize.authorization, book_controller.book_by_author);

// API 12
routes.delete('/remove', authorize.authorization, validator.book_id_array_validator, book_controller.remove_books);

// API 14
routes.get('/match', authorize.authorization, book_controller.book_by_author_match);

// API 13
// routes.get('/date',authorize.authorization,validator.book_name_author_validator,book_controller.book_by_earliest_date);

// API 7
routes.get('/currentbook', authorize.authorization, book_controller.current_books);

module.exports = routes;
