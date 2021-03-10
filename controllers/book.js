const book_service = require('../services/book');

const new_book = (req, res, next) => {
  book_service.new_book(req, res);
};

const update_book = (req, res, next) => {
  book_service.update_book(req, res);
};

const current_books = (req, res, next) => {
  book_service.current_books(req, res);
};

const book_by_genre = (req, res, next) => {
  book_service.books_by_genre(req, res);
};

const book_by_author = (req, res, next) => {
  book_service.books_by_author(req, res);
};

const remove_books = (req, res, next) => {
  book_service.remove_books(req, res);
};

const book_by_author_match = (req, res, next) => {
  book_service.books_by_author_match(req, res);
};

const book_by_earliest_date = (req, res, next) => {
  book_service.book_by_earliest_date(req, res);
};

module.exports = {
  new_book,
  update_book,
  current_books,
  book_by_genre,
  book_by_author,
  remove_books,
  book_by_author_match,
  book_by_earliest_date,
};
