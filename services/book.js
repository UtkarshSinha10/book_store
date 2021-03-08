/* eslint-disable max-len */
const book_query = require('../models/model_query/book_query');
const history_query = require('../models/model_query/history_query');
const jwt = require('jsonwebtoken');
const dateFormat = require('dateformat');
const {response} = require('../response/response');
const {Not_found_error, Database_operation_error, Duplication_error, Access_denial_error} = require('../errors/errors');

/**
 * Registering new book function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Duplication_error
 * @throws Database_operation_error
 * @throws Access_denial_error
 */
exports.new_book = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;

    if (user_is_admin) {
      const new_book = req.body;
      new_book.is_discarded=false;
      new_book.published= new Date(dateFormat(new Date(new_book.published), 'yyyy-mm-dd'));
      const found_book = await book_query.find_a_book_by_name(new_book.name);

      if (found_book) {
        throw new Duplication_error('Book already exists');
      }
      const book = await book_query.create_new_book(new_book);
      if (!book) {
        throw new Database_operation_error('Book not added');
      }
      return response(null, book.ops[0], 'Book added', res);
    } else {
      throw new Access_denial_error('Forbideden: Access is denies');
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Updating book function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Duplication_error
 * @throws Database_operation_error
 * @throws Access_denial_error
 */
exports.update_book = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;

    if (user_is_admin) {
      const found_book = await book_query.find_a_book_by_id(req.body.book_id);
      if (!found_book) {
        throw new Not_found_error('Book not found');
      } else {
        const new_book = {};
        if (req.body.copies) {
          new_book.copies = req.body.copies;
        }
        if (req.body.genre) {
          new_book.genre = req.body.genre;
        }
        if (req.body.price) {
          new_book.price = Number(req.body.price);
        }
        const update_book = await book_query.update_book(req.body.book_id, new_book);
        if (!update_book) {
          throw new Database_operation_error('Updation failed');
        }
        return response(null, update_book, 'Updation successful', res);
      }
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Current books in store function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
exports.current_books = async (req, res) => {
  try {
    const skip = req.query.skip;
    const limit = req.query.limit;
    const books_registered_in_store = await book_query.books_registered_in_store(skip, limit);
    const books_array = [];
    for (let index = 0; index < books_registered_in_store.length; index++) {
      const book_id = books_registered_in_store[index]._id;
      const total_copies = books_registered_in_store[index].copies;
      const rented_copies_of_book = await history_query.rented_copies_of_book(book_id);
      if (rented_copies_of_book.length) {
        books_array.push({
          book_id: book_id,
          total_copies: total_copies,
          rented_copies: rented_copies_of_book[0].total,
          present_copies: total_copies - rented_copies_of_book[0].total,
        });
      } else {
        books_array.push({
          book_id: book_id,
          total_copies: total_copies,
          rented_copies: 0,
          present_copies: total_copies,
        });
      }
    }
    return response(null, books_array, 'Books present details', res);
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Books by genre function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
exports.books_by_genre = async (req, res) => {
  try {
    const genre = req.query.genre;
    const skip = Number(req.query.skip);
    const limit = Number(req.query.limit);
    const book_list = await book_query.books_by_genre(genre, skip, limit);
    if (book_list) {
      return response(null, book_list, 'Search by genre successful', res);
    } else {
      return response(null, [], 'No books in given genre', res);
    }
  } catch (err) {
    console.log(err);
    return response(err, null, err.message, res);
  }
};

/**
 * Books by author function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
exports.books_by_author = async (req, res) => {
  try {
    const author = req.query.author;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const book_list = await book_query.books_by_author(author, skip, limit);
    if (book_list.length>0) {
      return response(null, book_list, 'Search by author successful', res);
    } else {
      return response(null, [], 'No books by given author', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Book removal function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Access_denial_error
 */
exports.remove_books = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;
    if (user_is_admin) {
      const book_array = req.body.book;
      const new_book_array = book_array.map((book) => book.book_id);
      const book_modification_details = await book_query.remove_book(new_book_array);
      return response(null, book_modification_details, 'Books removed', res);
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Books by author name matching function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
exports.books_by_author_match = async (req, res) => {
  try {
    const author = req.query.author;
    const skip = Number(req.query.skip);
    const limit = Number(req.query.limit);
    const book_list = await book_query.books_by_author_match(author, skip, limit);
    if (book_list.length>0) {
      return response(null, book_list, 'Search by matching author\'s name successful', res);
    } else {
      return response(null, [], 'No books written by given matching author\'s name', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Earliest availability date function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Duplication_error
 * @throws Not_found_error
 */
exports.book_by_earliest_date = async (req, res) => {
  try {
    const book_id = req.query.book_id;
    const book = await book_query.find_a_book_by_id(book_id);
    if (book) {
      if (!book.is_discarded) {
        const book_rented = await history_query.rented_copies_of_book(book_id);
        if (book_rented.length) {
          const difference = Number(book.copies) - Number(book_rented[0].total);
          if (difference == 0) {
            const history = await history_query.find_earliest_date(book_id);
            const rent_date = new Date(history[0].rent_date);
            const available_date = dateFormat(new Date(rent_date.setDate(rent_date.getDate()+14)), 'yyyy-mm-dd');
            return response(null, available_date, 'Book will be earrliest avialble on given date', res);
          }
        } else {
          return response(null, dateFormat(new Date()), 'Book is available to issue', res);
        }
      } else {
        return response(null, [], 'Book removed from the store', res);
      }
    } else {
      throw new Not_found_error('Book not found');
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};
