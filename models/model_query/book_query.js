const Book = require('../model_schema/book');
const {Database_operation_error} = require('../../errors/errors');

/**
 * Find book by book name.
 * @async
 * @param {string} name The book name.
 * @return {Object} Book document.
 * @throws Database_operation_error
 */
const find_a_book_by_name = async (name) => {
  try {
    const found_book = await Book.findOne({name: name});
    return found_book;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Find a book using book id.
 * @async
 * @param {id} id The book id.
 * @return {*} Book document.
 * @throws Database_operation_error
 */
const find_a_book_by_id = async (id) => {
  try {
    const found_book = await Book.findOne({_id: id});
    return found_book;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Remove book from database.
 * @async
 * @param {id} id The book id.
 * @throws Database_operation_error.
 * @return {*} Mongoose update object.
 */
const remove_book = async (id) => {
  try {
    const found_books = await Book.updateMany(
        {_id: {'$in': id}}, {is_discarded: true},
    );
    return found_books;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Creates a new book.
 * @async
 * @param {id} new_book The new book object.
 * @throws Database_operation_error
 * @return {*} Mongoose inserted object.
 */
const create_new_book = async (new_book) => {
  try {
    const new_book_entry = await Book.collection.insertOne(new_book);
    return new_book_entry;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Update book field.
 * @async
 * @param {id} id The book id.
 * @param {*} updated_body The book updation body.
 * @return {*} Mongoose update object.
 * @throws Database_operation_error.
 */
const update_book = async (id, updated_body) => {
  try {
    // eslint-disable-next-line new-cap
    const updated_book = await Book.findByIdAndUpdate({_id: id}, updated_body)
        .select('name id');
    return updated_book;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Total books present in database.
 * @async
 * @return {*} Total books present in database.
 * @throws Database_operation_error
 */
const count_total_books = async () => {
  try {
    const total_books = await Book.aggregate({
      $group: {
        'total': {
          $sum: '$copies',
        },
      },
    });
    return total_books.total;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Books by genre.
 * @async
 * @param {String} genre The genre of book.
 * @param {Number} skip The number of document to skip.
 * @param {Number} limit The number of document to return..
 * @return {*} Books of particular genre.
 * @throws Database_operation_error.
 */
const books_by_genre = async (genre, skip, limit) => {
  try {
    const books_by_genre = await Book.find({genre: genre})
        .select('id name price published author')
        .skip(skip)
        .limit(limit);
    return books_by_genre;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Books in store.
 * @async
 * @param {Number} skip The number of document to skip.
 * @param {Number} limit The number of document to return..
 * @return {*} Books in database.
 * @throws Database_operation_error.
 */
const books_registered_in_store = async (skip, limit) => {
  try {
    const books_registered_in_store = await Book.find()
        .select('id name copies')
        .skip(skip)
        .limit(limit);
    return books_registered_in_store;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Books by author name.
 * @async
 * @param {String} author The author of book.
 * @param {Number} skip The number of document to skip.
 * @param {Number} limit The number of document to return..
 * @return {*} Books by particular author.
 * @throws Database_operation_error.
 */
const books_by_author = async (author, skip, limit) => {
  try {
    const books_by_author = await Book.find(
        {author: author},
    ).select('id name price published').skip(skip).limit(limit);
    return books_by_author;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Books by author's name match.
 * @async
 * @param {String} author The author's partial or half name.
 * @param {Number} skip The number of document to skip.
 * @param {Number} limit The number of document to return..
 * @return {*} Books by auhtor's name match.
 * @throws Database_operation_error.
 */
const books_by_author_match = async (author, skip, limit) => {
  try {
    const book_list = await Book.find(
        {'$text': {'$search': author}},
    ).skip(skip).limit(limit);
    return book_list;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Books that can be rented
 * @async
 * @param {*} age The age for age appropriation
 * @param {*} book_id_array Array of book ids.
 * @return {*} Books that can be rented.
 * @throws Database_operation_error.
 */
const book_to_be_rented = async (age, book_id_array) => {
  try {
    const book_list = await Book.find(
        {'$and': [
          {_id: {'$in': book_id_array}},
          {is_discarded: false},
          {age_rated: {'$lte': age}},
        ]},
    );
    return book_list;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

module.exports = {
  find_a_book_by_name,
  find_a_book_by_id,
  remove_book,
  create_new_book,
  update_book,
  count_total_books,
  books_by_genre,
  books_registered_in_store,
  books_by_author,
  books_by_author_match,
  book_to_be_rented,
};
