/* eslint-disable max-len */
const Book = require('../model_schema/book');

exports.find_a_book_by_name = async (name) => {
  try {
    const found_book = await Book.findOne({name: name});
    return found_book;
  } catch (err) {
    throw err;
  }
};

exports.find_a_book_by_id = async (id) => {
  try {
    // eslint-disable-next-line new-cap
    const found_book = await Book.findOne({_id: id});
    return found_book;
  } catch (err) {
    throw err;
  }
};

exports.create_new_book = async (new_book) => {
  try {
    const new_book_entry = await Book.collection.insertOne(new_book);
    return new_book_entry;
  } catch (err) {
    throw err;
  }
};

exports.update_book= async (id, updated_body) => {
  try {
    // eslint-disable-next-line new-cap
    const updated_book = await Book.findByIdAndUpdate({_id: id}, updated_body).select('name id');
    return updated_book;
  } catch (err) {
    throw err;
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
    throw err;
  }
};

exports.books_by_genre = async (genre, limit) => {
  try {
    const books_by_genre = await Book.find({genre: genre}).select('id name price published author').limit(limit);
    return books_by_genre;
  } catch (err) {
    throw err;
  }
};

exports.books_by_author = async (author) => {
  try {
    const books_by_author = await Book.find({author: author});
    return books_by_author;
  } catch (err) {
    throw err;
  }
};

exports.books_by_author_match= async (book_author_substring) => {
  try {
    const book_list = await Book.find({
      $match: {
        author: {
          '$regex': book_author_substring,
          '$options': 'i',
        },
      },
    });
    return book_list;
  } catch (err) {
    throw err;
  }
};
