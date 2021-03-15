const book_service = require('../services/book');
const {response} = require('../response/response');

const new_book = async (req, res, next) => {
  try {
    const book = await book_service.new_book(req, res);
    response(null, book.ops, 'Book added', res);
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const update_book = async (req, res, next) => {
  try {
    const update_book = await book_service.update_book(req, res);
    return response(null, update_book, 'Updation successful', res);
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const current_books = async (req, res, next) => {
  try {
    const books_array = await book_service.current_books(req, res);
    response(null, books_array, 'Books present details', res);
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const book_by_genre = async (req, res, next) => {
  try {
    const book_list = await book_service.books_by_genre(req, res);
    if (book_list) {
      return response(null, book_list, 'Search by genre successful', res);
    } else {
      return response(null, [], 'No books in given genre', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const book_by_author = async (req, res, next) => {
  try {
    const book_list = await book_service.books_by_author(req, res);
    if (book_list.length > 0) {
      return response(null, book_list, 'Search by author successful', res);
    } else {
      return response(null, [], 'No books by given author', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const remove_books = async (req, res, next) => {
  try {
    const book_modification_details = await book_service.remove_books(req, res);
    return response(null, book_modification_details, 'Books removed', res);
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const book_by_author_match = async (req, res, next) => {
  try {
    const book_list = await book_service.books_by_author_match(req, res);
    if (book_list.length > 0) {
      return response(null, book_list, 'Books by matching author\'s name', res);
    } else {
      return response(null, [], 'No books with matching author\'s name', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const book_by_earliest_date = async (req, res, next) => {
  try {
    const available_date = await book_service.book_by_earliest_date(req, res);
    if (available_date) {
      return response(
          null,
          available_date,
          'Book will be earliest avialble on given date',
          res);
    } else {
      return response(null, [], 'Book not  store', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const books_by_descriptors = (req, res, next) => {
  book_service.books_by_descriptors(req, res);
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
  books_by_descriptors,
};
