/* eslint-disable max-len */
const express = require('express');
const book_controller = require('../controllers/book');
const authorize = require('../middlewares/authorization/authorize');
const validator = require('../middlewares/validations/validator');

// eslint-disable-next-line new-cap
const routes = express.Router();

routes.post('/new', authorize.authorization, validator.new_book_validator, book_controller.new_book);

routes.post('/update', authorize.authorization, validator.book_update_validator, book_controller.update_book);

routes.get('/genre', authorize.authorization, book_controller.book_by_genre);

routes.get('/author', authorize.authorization, validator.author_validator, book_controller.book_by_author);

routes.post('/remove', authorize.authorization, validator.book_name_author_validator, book_controller.remove_book);

routes.get('/matchauthor', authorize.authorization, validator.author_validator, book_controller.book_by_author_match);

// routes.get('/date',authorize.authorization,validator.book_name_author_validator,book_controller.book_by_earliest_date);

// routes.get('/currentbook', authorize.authorization, book_controller.current_books);

module.exports = routes;
