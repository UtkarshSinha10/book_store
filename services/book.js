/* eslint-disable valid-jsdoc */
const book_query = require('../models/model_query/book_query');
const history_query = require('../models/model_query/history_query');
const dateFormat = require('dateformat');

const {
  Not_found_error,
  Duplication_error,
  Access_denial_error,
} = require('../errors/errors');

/**
 * Registering new book function.
 * @async
 * @param {*} body The HTTP request.
 * @param {*} payload The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Duplication_error
 * @throws Database_operation_error
 * @throws Access_denial_error
 */
const new_book = async (body, payload) => {
  try {
    const user_is_admin = payload.user_is_admin;
    if (user_is_admin) {
      const new_book = body;
      new_book.is_discarded = false;
      new_book.published = new Date(
          dateFormat(new Date(new_book.published), 'yyyy-mm-dd'),
      );
      const found_book = await book_query.find_a_book_by_name(new_book.name);
      if (found_book) {
        throw new Duplication_error('Book already exists');
      }
      const book = await book_query.create_new_book(new_book);
      return book;
    } else {
      throw new Access_denial_error('Forbideden: Access is denied');
    }
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const books_by_descriptors = async (req, res) => {
  // const keywords = req.query.keywords;
  // if (keywords) {
  //   const query_body = {
  //     index: 'books',
  //     q: `*${keywords}*`,
  //   };
  //   elasticClient.search(query_body)
  //       .then((response_body) => {
  //         return response(
  //             null, response_body,
  //             'Books retrieval on keywords',
  //             res,
  //         );
  //       })
  //       .catch((err) => {
  //         console.log('hiii');
  //       });
  // }
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
const update_book = async (body, payload) => {
  try {
    const user_is_admin = payload.user_is_admin;

    if (user_is_admin) {
      const found_book = await book_query.find_a_book_by_id(body.book_id);
      if (!found_book) {
        throw new Not_found_error('Book not found');
      } else {
        const new_book = {};
        if (body.copies) {
          new_book.copies = body.copies;
        }
        if (body.genre) {
          new_book.genre = body.genre;
        }
        if (body.price) {
          new_book.price = Number(body.price);
        }
        const update_book = await
        book_query.update_book(body.book_id, new_book);
        return update_book;
      }
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Current books in store function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
const current_books = async (skip, limit) => {
  try {
    const books_registered_in_store = await
    book_query.books_registered_in_store(skip, limit);

    const books_array = [];
    for (let index = 0; index < books_registered_in_store.length; index++) {
      const book_id = books_registered_in_store[index]._id;
      const total_copies = books_registered_in_store[index].copies;
      const rented_copies_of_book = await
      history_query.rented_copies_of_book(book_id);

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
    return books_array;
  } catch (err) {
    throw err;
  }
};

/**
 * Books by genre function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
const books_by_genre = async (genre, skip, limit) => {
  try {
    const book_list = await book_query.books_by_genre(genre, skip, limit);
    return book_list;
  } catch (err) {
    throw err;
  }
};

/**
 * Books by author function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
const books_by_author = async (author, skip, limit) => {
  try {
    const book_list = await book_query.books_by_author(author, skip, limit);
    return book_list;
  } catch (err) {
    throw err;
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
const remove_books = async (body, payload) => {
  try {
    const user_is_admin = payload.user_is_admin;
    if (user_is_admin) {
      const book_array = body.book;
      const new_book_array = book_array.map((book) => book.book_id);
      const book_modification_details = await
      book_query.remove_book(new_book_array);
      return book_modification_details;
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Books by author name matching function.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
const books_by_author_match = async (author, skip, limit) => {
  try {
    const book_list = await
    book_query.books_by_author_match(author, skip, limit);

    return book_list;
  } catch (err) {
    throw err;
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
const book_by_earliest_date = async (book_id) => {
  try {
    const book = await book_query.find_a_book_by_id(book_id);
    if (book) {
      if (!book.is_discarded) {
        const book_rented = await history_query.rented_copies_of_book(book_id);
        if (book_rented.length) {
          const difference = Number(book.copies) - Number(book_rented[0].total);
          if (difference == 0) {
            const history = await history_query.find_earliest_date(book_id);
            const rent_date = new Date(history[0].rent_date);
            const available_date = dateFormat(
                new Date(rent_date.setDate(rent_date.getDate() + 14)),
                'yyyy-mm-dd',
            );
            return available_date;
          }
        } else {
          return dateFormat(new Date(), 'yyyy-mm-dd');
        }
      } else {
        return null;
      }
    } else {
      throw new Not_found_error('Book not found');
    }
  } catch (err) {
    throw err;
  }
};


module.exports = {
  new_book,
  update_book,
  current_books,
  books_by_genre,
  books_by_author,
  remove_books,
  books_by_author_match,
  book_by_earliest_date,
  books_by_descriptors,
};
