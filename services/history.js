/* eslint-disable valid-jsdoc */
const history_query = require('../models/model_query/history_query');
const user_query = require('../models/model_query/user_query');
const book_query = require('../models/model_query/book_query');
const dateFormat = require('dateformat');
const {
  Not_found_error,
  Access_denial_error,
  Limit_exceeded_error,
} = require('../errors/errors');

/**
 * Rent books function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Limit_exceeded_error
 */
const rent_books = async (book_array, payload) => {
  try {
    const user_email = payload.user_email;
    const user = await user_query.find_user(user_email);
    const id = user._id;
    const count_books_rented = await history_query.count_books_rented(id);
    const dob = new Date(user.dob);
    const age = Math.floor((new Date() - dob.getTime()) / 31557600000);
    if (count_books_rented >= 10) {
      throw new Limit_exceeded_error('Maximum limit to issue books reached');
    } else {
      const new_book_array = book_array.map((book) => book.book_id);
      const books_to_be_rented = await
      book_query.book_to_be_rented(age, new_book_array);

      const avaiable_books_to_be_rented = [];
      for (let i = 0; i < books_to_be_rented.length; i++) {
        const rented = await
        history_query.count_books_rented_by_book_id(books_to_be_rented[i].id);
        if (books_to_be_rented[i].copies - rented > 0) {
          avaiable_books_to_be_rented.push(books_to_be_rented[i]);
        }
      }

      const rent_books_array = [];
      const not_rented_books_array = [];
      if (avaiable_books_to_be_rented.length === 0) {
        return null;
      }
      let i = 0;
      for (;
        i < (10 - count_books_rented) && i < avaiable_books_to_be_rented.length;
        i++) {
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
      while (i<avaiable_books_to_be_rented.length) {
        not_rented_books_array.push(
            {
              book_id: avaiable_books_to_be_rented[i]._id,
            },
        );
      }
      const rent_books = await history_query.rent_books(rent_books_array);
      const rent_response = {
        rented_books: rent_books,
        not_rented_books: not_rented_books_array,
      };
      return rent_response;
    }
  } catch (err) {
    throw err;
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
const return_books = async (book_array, payload) => {
  try {
    const user_email = payload.user_email;
    const user = await user_query.find_user(user_email);
    const id = user._id;
    if (!user) {
      throw new Not_found_error('User not found');
    } else {
      const new_book_array = book_array.map((book) => book.book_id);
      const return_books = await history_query.return_books(id, new_book_array);
      return return_books;
    }
  } catch (err) {
    throw err;
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
const amount_spent = async (email, payload) => {
  try {
    const user_email = payload.user_email;
    const is_admin = payload.user_is_admin;
    if ((is_admin) || (email === user_email)) {
      const user = await user_query.find_user(email);
      if (!user) {
        throw new Not_found_error('User not found');
      }
      const today = new Date();
      const last_date = today.setDate(today.getDate() - 100);
      const amount = await history_query.amount_spent(user._id, last_date);
      if (amount.length === 0) {
        return null;
      }
      const user_spent = amount[0].total;
      return user_spent;
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Rented books function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
const rented_books = async () => {
  try {
    const rented_books = await history_query.find_all_rented_books();
    return rented_books;
  } catch (err) {
    throw err;
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
const rented_books_to_user = async (email, payload) => {
  try {
    const user_email = payload.user_email;
    const user_is_admin = payload.user_is_admin;
    if ((user_is_admin) || (email === user_email)) {
      const user = await user_query.find_user(email);
      if (!user) {
        throw new Not_found_error('User not found');
      }
      const id = user._id;
      const rented_books_to_user = await history_query.rented_books_to_user(id);
      return rented_books_to_user;
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  rent_books,
  return_books,
  amount_spent,
  rented_books,
  rented_books_to_user,
};
