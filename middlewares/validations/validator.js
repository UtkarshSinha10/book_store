const validate_schema = require('./validate_schema');
const {response} = require('../../response/response');

/**
 * Login Validator
 * @param {*} req The Request.
 * @param {*} res The Request
 * @param {*} next The next()
 * @return {*} Error response or call next().
 */
exports.login_validator = (req, res, next)=>{
  const valid = validate_schema.login_schema.validate(req.body);
  if (valid.error) {
    return response(valid.error, null, 'Validation Failed', res);
  } else {
    next();
  }
};

/**
 * Register Validator
 * @param {*} req The Request.
 * @param {*} res The Request
 * @param {*} next The next()
 * @return {*} Error response or call next().
 */
exports.register_validator = (req, res, next) => {
  const valid = validate_schema.registration_schema.validate(req.body);
  if (valid.error) {
    return response(valid.error, null, 'Validation Failed', res);
  } else {
    next();
  }
};

/**
 * New Admin Validator
 * @param {*} req The Request.
 * @param {*} res The Request
 * @param {*} next The next()
 * @return {*} Error response or call next().
 */
exports.new_admin_validator = (req, res, next)=>{
  const valid = validate_schema.new_admin_schema.validate(req.body);
  if (valid.error) {
    return response(valid.error, null, 'Validation Failed', res);
  } else {
    next();
  }
};

/**
 * New Book Validator
 * @param {*} req The Request.
 * @param {*} res The Request
 * @param {*} next The next()
 * @return {*} Error response or call next().
 */
exports.new_book_validator = (req, res, next) => {
  const valid = validate_schema.new_book_schema.validate(req.body);
  if (valid.error) {
    return response(valid.error, null, 'Validation Failed', res);
  } else {
    next();
  }
};

/**
 * Book Update Validator
 * @param {*} req The Request.
 * @param {*} res The Request
 * @param {*} next The next()
 * @return {*} Error response or call next().
 */
exports.book_update_validator = (req, res, next) => {
  const valid = validate_schema.book_update_schema.validate(req.body);
  if (valid.error) {
    return response(valid.error, null, 'Validation Failed', res);
  } else {
    next();
  }
};

/**
 * User Validator
 * @param {*} req The Request.
 * @param {*} res The Request
 * @param {*} next The next()
 * @return {*} Error response or call next().
 */
exports.user_validator = (req, res, next) => {
  const valid = validate_schema.user_schema.validate(req.body);
  if (valid.error) {
    return response(valid.error, null, 'Validation Failed', res);
  } else {
    next();
  }
};

/**
 * Book Id Array  Validator
 * @param {*} req The Request.
 * @param {*} res The Request
 * @param {*} next The next()
 * @return {*} Error response or call next().
 */
exports.book_id_array_validator = (req, res, next) => {
  const valid = validate_schema.book_id_array_schema.validate(req.body);
  if (valid.error) {
    return response(valid.error, null, 'Validation Failed', res);
  } else {
    next();
  }
};
