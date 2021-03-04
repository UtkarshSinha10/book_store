const mongoose = require('mongoose');

/**
 * Book Schema
 */
const book_schema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  publised: {
    type: Date,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  age_rated: {
    type: Number,
    required: true,
  },
  is_discarded: {
    type: Boolean,
    default: false,
  },
  copies: {
    type: Number,
    required: true,
  },
});

book_schema.index({author: 'text'});
book_schema.index({name: 1});
book_schema.index({genre: 1});
module.exports = mongoose.model('book', book_schema);
