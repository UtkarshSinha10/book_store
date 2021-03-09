/* eslint-disable max-len */
const history_query = require('../models/model_query/history_query');
const user_query = require('../models/model_query/user_query');
const book_query = require('../models/model_query/book_query');
const dateFormat = require('dateformat');
const jwt = require('jsonwebtoken');
const {response} = require('../response/response');
const {Not_found_error, Access_denial_error, Limit_exceeded_error} = require('../errors/errors');

/**
 * Rent books function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Limit_exceeded_error
 */
exports.rent_books = async (req, res) => {
  try {
    const book_array = req.body.book;
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_email = payload.user_email;
    const user = await user_query.find_user(user_email);
    const id = user._id;
    const count_books_rented = await history_query.count_books_rented(id);
    const dob = new Date(user.dob);
    const age = Math.floor((new Date() - dob.getTime())/31557600000);
    if (count_books_rented>=10) {
      throw new Limit_exceeded_error('Maximum limit to issue books reached');
    } else {
      const new_book_array = book_array.map((book) => book.book_id);
      const books_to_be_rented = await book_query.book_to_be_rented(age, new_book_array);
      const avaiable_books_to_be_rented = [];
      for (let i = 0; i< books_to_be_rented.length; i++) {
        const rented = await history_query.count_books_rented_by_book_id(books_to_be_rented[i].id);
        if (books_to_be_rented[i].copies - rented >0) {
          avaiable_books_to_be_rented.push(books_to_be_rented[i]);
        }
      }

      const rent_books_array = [];
      if ( avaiable_books_to_be_rented.length ==0 ) {
        return response(null, [], 'Books are not either availabe or already rented to you', res);
      }
      for (let i = 0; i< (10-count_books_rented) && i< avaiable_books_to_be_rented.length; i++) {
        rent_books_array.push(
            {
              user_id: id,
              book_id: avaiable_books_to_be_rented[i]._id,
              book_price: avaiable_books_to_be_rented[i].price,
              rent_date: Date(dateFormat(new Date(), 'yyyy-mm-dd')),
              is_returned: false,
              returned_date: Date(dateFormat(new Date(), 'yyyy-mm-dd')),
            },
        );
      }
      const rent_books = await history_query.rent_books(rent_books_array);
      return response(null, rent_books, 'Books rented to you', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Return books function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Not_found_error.
 */
exports.return_books = async (req, res) => {
  try {
    const book_array = req.body.book;
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_email = payload.user_email;
    const user = await user_query.find_user(user_email);
    const id = user._id;
    if (!user) {
      throw new Not_found_error('User not found');
    } else {
      const new_book_array = book_array.map((book) => book.book_id);
      const return_books = await history_query.return_books(id, new_book_array);
      return response(null, return_books, 'Books returned', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Amount spent in 100 days function  function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Not_found_error.
 * @throws Access_denial_error.
 */
exports.amount_spent = async (req, res) => {
  try {
    const email = req.body.email;
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_email = payload.user_email;
    const is_admin = payload.user_is_admin;
    if ((is_admin) || (email === user_email)) {
      const user = await user_query.find_user(email);
      if (!user) {
        throw new Not_found_error('User not found');
      }
      const today = new Date();
      const last_date = today.setDate(today.getDate()-100);
      const amount = await history_query.amount_spent(user._id, last_date);
      if (amount.length === 0) {
        return response(null, 0, 'Amount spent by user in last 100 days', res);
      }
      const user_spent = amount[0].total;

      return response(null, user_spent, 'Amount spent by user in last 100 days', res);
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    // console.log(err);
    return response(err, null, err.message, res);
  }
};

/**
 * Rented books function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
exports.rented_books = async (req, res) => {
  try {
    const rented_books = await history_query.find_all_rented_books();
    return response(null, rented_books, 'Rented Book Ids and their copies', res);
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Books rented to a user function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Not_found_error.
 * @throws Access_denial_error.
 */
exports.rented_books_to_user = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_email = payload.user_email;
    const user_is_admin = payload.user_is_admin;
    const email = req.body.email;
    if ((user_is_admin) || (email === user_email)) {
      const user = await user_query.find_user(req.body.email);
      if (!user) {
        throw new Not_found_error('User not found');
      }
      const id = user._id;
      const rented_books_to_user = await history_query.rented_books_to_user(id);
      if (rented_books_to_user.length) {
        return response(null, rented_books_to_user, 'Books rented to the user', res);
      } else {
        return response(null, [], 'No rented books to user found', res);
      }
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};
