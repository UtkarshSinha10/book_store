/* eslint-disable max-len */
const Book = require('../model_schema/book');

exports.find_a_book_by_name = async (book) => {
  try {
    const found_book = await Book.findOne({name: book.name});
    return found_book;
  } catch (err) {
    throw err;
  }
};

exports.create_new_book = async (new_book) => {
  try {
    const new_book_entry = await Book.insertMany([new_book]);
    return new_book_entry;
  } catch (err) {
    throw err;
  }
};

exports.update_copies_of_a_book= async (book_body) => {
  try {
    const update_copies = await Book.updateOne({name: book_body.name}, {copies: book_body.copies});
    return update_copies;
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

exports.books_by_genre = async (genre) => {
  try {
    const books_by_genre = await Book.find({genre: genre});
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

exports.update_price_of_a_book= async (book_body) => {
  try {
    const update_price = await Book.updateOne({name: book_body.name}, {price: book_body.price});
    return update_price;
  } catch (err) {
    throw err;
  }
};

exports.update_genre_of_a_book= async (book_body) => {
  try {
    const update_price = await Book.updateOne({name: book_body.name}, {genre: book_body.genre});
    return update_price;
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
