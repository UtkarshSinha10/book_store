/* eslint-disable max-len */
const Book = require('../model_schema/book');
const {Database_operation_error} = require('../../errors/errors');

exports.find_a_book_by_name = async (name) => {
  try {
    const found_book = await Book.findOne({name: name});
    return found_book;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.find_a_book_by_id = async (id) => {
  try {
    const found_book = await Book.findOne({_id: id});
    return found_book;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.remove_book = async (id) => {
  try {
    const found_books = await Book.updateMany({_id: {'$in': id}}, {is_discarded: true});
    return found_books;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.create_new_book = async (new_book) => {
  try {
    const new_book_entry = await Book.collection.insertOne(new_book);
    return new_book_entry;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.update_book= async (id, updated_body) => {
  try {
    // eslint-disable-next-line new-cap
    const updated_book = await Book.findByIdAndUpdate({_id: id}, updated_body).select('name id');
    return updated_book;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.count_total_books = async () => {
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

exports.books_by_genre = async (genre, skip, limit) => {
  try {
    const books_by_genre = await Book.find({genre: genre}).select('id name price published author').skip(skip).limit(limit);
    return books_by_genre;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.books_registered_in_store = async (skip, limit) => {
  try {
    const books_registered_in_store = await Book.find().select('id name copies').skip(skip).limit(limit);
    return books_registered_in_store;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.books_by_author = async (author, skip, limit) => {
  try {
    const books_by_author = await Book.find({author: author}).select('id name price published').skip(skip).limit(limit);
    return books_by_author;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.books_by_author_match= async (author, skip, limit) => {
  try {
    const book_list = await Book.find({'$text': {'$search': author}}).skip(skip).limit(limit);
    return book_list;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.book_to_be_rented = async (age, book_id_array) => {
  try {
    const book_list = await Book.find({'$and': [{_id: {'$in': book_id_array}}, {is_discarded: false}, {age_rated: {'$gte': age}}]});

    return book_list;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};
