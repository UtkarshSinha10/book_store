const book_service = require('../services/book');

exports.new_book = (req, res, next) => {
  book_service.new_book(req, res);
};

exports.update_book = (req, res, next) => {
  book_service.update_book(req, res);
};

exports.current_books = (req, res, next) => {
  book_service.current_books(req, res);
};

exports.book_by_genre = (req, res, next) => {
  book_service.books_by_genre(req, res);
};

exports.book_by_author = (req, res, next) => {
  book_service.books_by_author(req, res);
};

exports.remove_book = (req, res, next) => {
  book_service.remove_book(req, res);
};

exports.book_by_author_match = (req, res, next) => {
  book_service.books_by_author_match(req, res);
};

// exports.book_by_earliest_date =(req,res,next) => {
//     book_service.book_by_earliest_date(req,res);
// }


