/* eslint-disable max-len */
const Joi = require('joi');

// used
const login_schema = Joi.object().keys({

  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),

});
// used
const registration_schema = Joi.object().keys({

  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  dob: Joi.date().required(),

});
// used
const new_admin_schema = Joi.object().keys({

  email: Joi.string().email().required(),

});
// used
const new_book_schema = Joi.object().keys({

  name: Joi.string().required(),
  price: Joi.number().required(),
  published: Joi.date().required(),
  pages: Joi.number().min(1).required(),
  author: Joi.string().min(3).max(30).required(),
  genre: Joi.string().min(3).max(30).required(),
  age_rated: Joi.number().min(0).required(),
  copies: Joi.number().min(1).required(),
  description: Joi.string().required(),

});
// used
const book_update_schema = Joi.object().keys({

  book_id: Joi.string().required(),
  copies: Joi.number().optional(),
  genre: Joi.string().optional(),
  price: Joi.number().optional(),

});

// used
const book_id_object_schema = Joi.object().keys({

  book_id: Joi.string().required(),

});
// used
const book_id_array_schema = Joi.object().keys({

  book: Joi.array().items(book_id_object_schema),

});

module.exports = {
  login_schema,
  registration_schema,
  new_admin_schema,
  new_book_schema,
  book_update_schema,
  book_id_array_schema,
};
