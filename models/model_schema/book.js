const mongoose = require('mongoose');

const book_schema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  publised: {
    type: Date,
    default: Date.now(),
  },
  pages: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  age_appropriation: {
    type: Number,
    required: true,
  },
  is_discarded: {
    type: Boolean,
    default: false,
  },
  copies: {
    type: Number,
    default: 1,
  },
});

book_schema.index({name: 1}, {unique: true});


module.exports = mongoose.model('Book', book_schema);