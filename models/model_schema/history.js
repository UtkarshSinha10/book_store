const mongoose = require('mongoose');

const history_schema= new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book',
  },
  book_price: {
    type: Number,
    required: true,
  },
  rent_date: {
    type: Date,
    required: true,
  },
  is_returned: {
    type: Boolean,
    default: false,
  },
  returned_date: {
    type: Date,
    default: Date.now(),
  },
});

history_schema.index({user_id: 1});
history_schema.index({book_id: 1});
history_schema.index({date: -1});

module.exports = mongoose.model('history', history_schema);
