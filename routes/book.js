/* eslint-disable max-len */
const express = require('express');
const book_controller = require('../controllers/book');
const authorize = require('../middlewares/authorization/authorize');
const validator = require('../middlewares/validations/validator');

// eslint-disable-next-line new-cap
const routes = express.Router();

// API 3
/**
 * New book route
 * POST Request
 */
routes.post('/new', authorize.authorization, validator.new_book_validator, book_controller.new_book);

// API 4
/**
 * Update book route
 * POST Request
 */
routes.post('/update', authorize.authorization, validator.book_update_validator, book_controller.update_book);

// API 8
/**
 * Get books by genre route
 * GET Request
 */
routes.get('/genre', authorize.authorization, book_controller.book_by_genre);

// API 11
/**
 * Get books by author route
 * GET Request
 */
routes.get('/author', authorize.authorization, book_controller.book_by_author);

// API 12
/**
 * Book removal route
 * DELETE Request
 */
routes.delete('/remove', authorize.authorization, validator.book_id_array_validator, book_controller.remove_books);

// API 14
/**
 * Books by author's name match route
 * GET Request
 */
routes.get('/match', authorize.authorization, book_controller.book_by_author_match);

// API 13
/**
 * Book's avaliable date route
 * GET Request
 */
routes.get('/date', authorize.authorization, book_controller.book_by_earliest_date);

// API 7
/**
 * Current books route
 * GET Request
 */
routes.get('/currentbook', authorize.authorization, book_controller.current_books);

// API additional for elasticsearch
/**
 * Get books using descriptors/keywords related to book
 * GET Request
 */
// routes.get('/describe', authorize.authorization, book_controller.books_by_descriptors);
module.exports = routes;
