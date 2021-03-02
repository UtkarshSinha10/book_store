/* eslint-disable max-len */
const Joi = require('joi');

exports.login_schema = Joi.object().keys({

  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),

});

exports.registration_schema = Joi.object().keys({

  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  dob: Joi.date().required(),

});

exports.new_admin_schema = Joi.object().keys({

  email: Joi.string().email().required(),

});

exports.new_book_schema = Joi.object().keys({

  name: Joi.string().required(),
  price: Joi.number().required(),
  published: Joi.date().required(),
  pages: Joi.number().min(1).required(),
  author: Joi.string().min(3).max(30).required(),
  genre: Joi.string().min(3).max(30).required(),
  age_rated: Joi.number().min(0).required(),
  copies: Joi.number().min(1).required(),

});

exports.book_update_schema = Joi.object().keys({

  book_id: Joi.string().required(),
  copies: Joi.number().optional(),
  genre: Joi.string().optional(),
  price: Joi.number().optional(),

});

exports.user_schema = Joi.object().keys({

  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).required(),

});

exports.book_genre_schema = Joi.object().keys({

  genre: Joi.string().min(3).max(30).required(),

});

exports.book_author_schema = Joi.object().keys({

  author: Joi.string().min(3).max(30).required(),

});

const book_id_object_schema = Joi.object().keys({

  book_id: Joi.string().required(),

});

exports.book_id_array_schema = Joi.object().keys({

  book: Joi.array().items(book_id_object_schema),

});
