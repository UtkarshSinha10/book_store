/* eslint-disable new-cap */
/* eslint-disable max-len */
const Mongoose = require('mongoose');
const History = require('../model_schema/history');
const dateFormat = require('dateformat');
const {Database_operation_error} = require('../../errors/errors');

/**
 * Count rented books using book id.
 * @async
 * @param {id} id The book id.
 * @return {*} Count of rented books.
 * @throws Database_operation_error.
 */
exports.count_books_rented = async (id) => {
  try {
    const count = await History.countDocuments({'$and': [{user_id: id}, {is_returned: true}]});
    return count;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Rent books.
 * @async
 * @param {*} rent_books_array Array of book ids.
 * @return {*} Mongoose update object.
 * @throws Database_operation_error.
 */
exports.rent_books = async (rent_books_array) => {
  try {
    const rent_books = await History.insertMany(rent_books_array);
    return rent_books;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Return books
 * @async
 * @param {id} id User id.
 * @param {*} return_books_array Array of book ids.
 * @return {*} Mongoose update objects.
 * @throws Database_operation_error.
 */
exports.return_books = async (id, return_books_array) => {
  try {
    console.log(id);
    // console.log(return_books_array);
    const return_books = await History.updateMany({'$and': [{user_id: id}, {book_id: {'$in': return_books_array}}, {is_returned: false}]}, {is_returned: true, returned_date: new Date(dateFormat(new Date(), 'yyyy-mm-dd'))});
    // console.log(return_books);
    return return_books;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Count number of book copies rented.
 * @async
 * @param {id} id Book id.
 * @return {Number} Count of book copies rented.
 * @throws Database_operation_error.
 */
exports.count_books_rented_by_book_id = async (id) => {
  try {
    const count = await History.countDocuments({'$and': [{book_id: id}, {is_returned: false}]});
    return count;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Amount spent in 100 days.
 * @async
 * @param {id} id The user id.
 * @param {date} last_date The last date from where sum starts.
 * @return {Number} Sum of money spent.
 * @throws Database_operation_error.
 */
exports.amount_spent = async (id, last_date) => {
  try {
    const date = new Date(new Date(null).setSeconds(last_date/1000));
    // eslint-disable-next-line new-cap
    const amount = await History.aggregate([{'$match': {'$and': [{user_id: id}, {rent_date: {'$gte': date}}]}}, {'$group': {_id: null, total: {'$sum': '$book_price'}}}]);
    return amount;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * All rented books.
 * @async
 * @return {*} Array of objects with book id and copies rented.
 * @throws Database_operation_error.
 */
exports.find_all_rented_books = async () => {
  try {
    const rented_books = await History.aggregate([{'$match': {is_returned: false}}, {'$group': {_id: '$book_id', total: {'$sum': 1}}}]);
    return rented_books;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Books rented to a particular user
 * @async
 * @param {id} id The user id.
 * @return {*} Array of book objects rented to the user.
 * @throws Database_operation_error.
 */
exports.rented_books_to_user = async (id) => {
  try {
    const rented_books_to_user = await History.find({book_id: id, is_returned: false});
    return rented_books_to_user;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Rented copies of book.
 * @async
 * @param {id} id The book id.
 * @return {*} Mongoose object of group by book id and rented copies.
 * @throws Database_operation_error.
 */
exports.rented_copies_of_book = async (id) => {
  try {
    const rented_copies_of_book = await History.aggregate([{'$match': {'$and': [{book_id: Mongoose.Types.ObjectId(id)}, {is_returned: false}]}}, {'$group': {_id: '$book_id', total: {'$sum': 1}}}]);
    // console.log(rented_copies_of_book);
    return rented_copies_of_book;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Earliest book availability date.
 * @async
 * @param {id} book_id The book id.
 * @return {*} Mongoose object of history document.
 * @throws Database_operation_error.
 */
exports.find_earliest_date = async (book_id) => {
  try {
    const history = await History.find({book_id: book_id, is_returned: false}).sort({rent_date: 1}).limit(1);
    return history;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};
