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

exports.new_book_schema = Joi.object().keys({

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

exports.copies_update_schema = Joi.object().keys({

  name: Joi.string().required(),
  copies: Joi.number().min(1).required(),
  author: Joi.string().min(3).max(30).required(),

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

exports.price_update_schema = Joi.object().keys({

  name: Joi.string().required(),
  price: Joi.number().required(),
  author: Joi.string().min(3).max(30).required(),

});

exports.genre_update_schema = Joi.object().keys({

  name: Joi.string().required(),
  genre: Joi.string().required(),
  author: Joi.string().min(3).max(30).required(),

});

exports.book_name_author_schema = Joi.object().keys({

  name: Joi.string().required(),
  author: Joi.string().min(3).max(30).required(),

});
