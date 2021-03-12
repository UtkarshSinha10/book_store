const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

/**
 * Book Schema
 */
const book_schema = new mongoose.Schema({

  name: {
    type: String,
    es_indexed: true,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  published: {
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
  description: {
    type: String,
    es_indexed: true,
    required: true,
  },
});

book_schema.plugin(mongoosastic, {
  hosts: [
    'localhost:9200',
  ],
  type: '_doc',
});

book_schema.index({author: 'text'});
book_schema.index({name: 1});
book_schema.index({genre: 1});

module.exports = mongoose.model('book', book_schema);
