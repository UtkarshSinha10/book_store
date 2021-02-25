const validate_schema = require('./validate_schema');
const validation_body = require('./validation_body');


exports.login_validator = (req, res, next)=>{
  const valid = validate_schema.login_schema.validate(req.body);
  if (valid.error) {
    res.status(422).json(validation_body.invalid_body('Validation Failed'));
  } else {
    next();
  }
};

exports.register_validator = (req, res, next) => {
  const valid = validate_schema.registration_schema.validate(req.body);
  if (valid.error) {
    res.status(422).json(validation_body.invalid_body('Validation Failed'));
  } else {
    next();
  }
};

exports.new_admin_validator = (req, res, next)=>{
  const valid = validate_schema.new_admin_schema.validate(req.body);
  if (valid.error) {
    res.status(422).json(validation_body.invalid_body('Validation Failed'));
  } else {
    next();
  }
};

exports.new_book_validator = (req, res, next) => {
  const valid = validate_schema.new_book_schema.validate(req.body);
  if (valid.error) {
    res.status(422).json(validation_body.invalid_body('Validation Failed'));
  } else {
    next();
  }
};

exports.book_update_validator = (req, res, next) => {
  const valid = validate_schema.book_update_schema.validate(req.body);
  if (valid.error) {
    res.status(422).json(validation_body.invalid_body('Validation Failed'));
  } else {
    next();
  }
};

exports.user_validator = (req, res, next) => {
  const valid = validate_schema.user_schema.validate(req.body);
  if (valid.error) {
    res.status(422).json(validation_body.invalid_body('Validation Failed'));
  } else {
    next();
  }
};

exports.genre_validator = (req, res, next) => {
  const valid = validate_schema.book_genre_schema.validate(req.body);
  if (valid.error) {
    res.status(422).json(validation_body.invalid_body('Validation Failed'));
  } else {
    next();
  }
};

exports.author_validator = (req, res, next) => {
  const valid = validate_schema.book_author_schema.validate(req.body);
  if (valid.error) {
    res.status(422).json(validation_body.invalid_body('Validation Failed'));
  } else {
    next();
  }
};


exports.book_name_author_validator = (req, res, next) => {
  const valid = validate_schema.book_name_author_schema.validate(req.body);
  if (valid.error) {
    res.status(422).json(validation_body.invalid_body('Validation Failed'));
  } else {
    next();
  }
};
