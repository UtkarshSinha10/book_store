const Joi = require('joi');

const login_schema = Joi.object().keys({
    
    user_email: Joi.string().email().required(),
    user_password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).min(6).required()

});

const registration_schema = Joi.object().keys({

    user_name: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required(),
    user_email: Joi.string().email().required(),
    user_password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).min(6).required(),
    user_is_admin: Joi.boolean().optional(),
    user_dob: Joi.date().required(),
    user_age: Joi.number().min(12).max(150).required()

});

const new_book_schema = Joi.object().keys({

    book_name: Joi.string().required(),
    book_price: Joi.number().required(),
	booK_published_date: Joi.date().required(),
	book_pages: Joi.number().min(1).required(),
	book_author: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required(),
	book_genre: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required(),
	book_age_approprriation: Joi.number().min(12).required(),
	book_copies: Joi.number().min(1).required()

});

const copies_update_schema = Joi.object().keys({

    book_name: Joi.string().required(),
	book_copies: Joi.number().min(1).required(),
	book_author: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required()

});

const user_schema = Joi.object().keys({

    user_name: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required(),
    user_email: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).required()

});

const book_genre_schema = Joi.object().keys({

    book_genre: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required()

});

const book_author_schema = Joi.object().keys({

    book_author: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required()

});

const price_update_schema = Joi.object().keys({

    book_name: Joi.string().required(),
	book_price: Joi.number().required(),
	book_author: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required(),
	
});

const genre_update_schema = Joi.object().keys({

    book_name: Joi.string().required(),
	book_genre: Joi.string().regex(/^[a-zA-Z]$/).required(),
	book_author: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required()

});

const book_name_author_schema = Joi.object().keys({

    book_name: Joi.string().required(),
	book_author: Joi.string().regex(/^[a-zA-Z]$/).min(3).max(30).required()

});

exports.login_schema = login_schema;
exports.registration_schema = registration_schema;
exports.new_book_schema  = new_book_schema;
exports.copies_update_schema = copies_update_schema;
exports.user_schema = user_schema;
exports.book_genre_schema = book_genre_schema;
exports.book_author_schema = book_author_schema;
exports.price_update_schema = price_update_schema;
exports.genre_update_schema = genre_update_schema;
exports.book_name_author_schema = book_name_author_schema;