const mongoose = require('mongoose');


const user_schema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

user_schema.index({email: 1, name: 1, is_admin: 1}, {unique: true});

module.exports = mongoose.model('user', user_schema);
