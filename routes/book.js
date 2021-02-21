const express = require('express');
const book_controller = require('../controllers/book');
const authorize = require('../middlewares/authorization/authorize');
const validator = require('../middlewares/validations/validator')

const routes = express.Router();

routes.post('/new',authorize.authorization,validator.new_book_validator,book_controller.new_book);

routes.post('/updatecopies',authorize.authorization,validator.copies_update_validator,book_controller.update_copies);

routes.get('/presentbooks',authorize.authorization,book_controller.present_books);

routes.get('/genre',authorize.authorization,validator.genre_validator,book_controller.book_by_genre);

routes.get('/author',authorize.authorization,validator.author_validator,book_controller.book_by_author);

routes.post('/updateprice',authorize.authorization,validator.price_update_validator,book_controller.update_price);

routes.post('/updategenre',authorize.authorization,validator.genre_update_validator,book_controller.update_genre);

routes.post('/remove',authorize.authorization,validator.book_name_author_validator,book_controller.remove_book);

routes.get('/matchauthor',authorize.authorization,validator.author_validator,book_controller.book_by_author_match);

// routes.get('/date',authorize.authorization,validator.book_name_author_validator,book_controller.book_by_earliest_date);

module.exports = routes;