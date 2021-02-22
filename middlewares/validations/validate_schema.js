/* eslint-disable max-len */
const Joi = require('joi');

const login_schema = Joi.object().keys({

  email: Joi.string().email().required(),
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).min(6).required(),

});

const registration_schema = Joi.object().keys({

  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  is_admin: Joi.boolean().required(),
  dob: Joi.date().required(),
  age: Joi.number().min(12).max(150).required(),
  is_active: Joi.boolean().required(),
  // .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])$/)
  // regex(/^[a-zA-Z]$/).
});

const new_book_schema = Joi.object().keys({

  name: Joi.string().required(),
  price: Joi.number().required(),
  published: Joi.date().required(),
  pages: Joi.number().min(1).required(),
  author: Joi.string().min(3).max(30).required(),
  genre: Joi.string().min(3).max(30).required(),
  age_appropriation: Joi.number().min(12).required(),
  copies: Joi.number().min(1).required(),
  is_discarded: Joi.boolean().required(),

});

const copies_update_schema = Joi.object().keys({

  name: Joi.string().required(),
  copies: Joi.number().min(1).required(),
  author: Joi.string().min(3).max(30).required(),

});

const user_schema = Joi.object().keys({

  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).required(),

});

const book_genre_schema = Joi.object().keys({

  genre: Joi.string().min(3).max(30).required(),

});

const book_author_schema = Joi.object().keys({

  author: Joi.string().min(3).max(30).required(),

});

const price_update_schema = Joi.object().keys({

  name: Joi.string().required(),
  price: Joi.number().required(),
  author: Joi.string().min(3).max(30).required(),

});

const genre_update_schema = Joi.object().keys({

  name: Joi.string().required(),
  genre: Joi.string().required(),
  author: Joi.string().min(3).max(30).required(),

});

const book_name_author_schema = Joi.object().keys({

  name: Joi.string().required(),
  author: Joi.string().min(3).max(30).required(),

});

exports.login_schema = login_schema;
exports.registration_schema = registration_schema;
exports.new_book_schema = new_book_schema;
exports.copies_update_schema = copies_update_schema;
exports.user_schema = user_schema;
exports.book_genre_schema = book_genre_schema;
exports.book_author_schema = book_author_schema;
exports.price_update_schema = price_update_schema;
exports.genre_update_schema = genre_update_schema;
exports.book_name_author_schema = book_name_author_schema;
