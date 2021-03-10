/* eslint-disable max-len */
const user_query = require('../models/model_query/user_query');
const dateFormat = require('dateformat');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {response} = require('../response/response');
const {Not_found_error, Credential_error, Duplication_error, Access_denial_error} = require('../errors/errors');

/**
 * Login.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Credential_error
 * @throws Not_found_error
 */
const login = async (req, res) => {
  try {
    const user = await user_query.find_user(req.body.email);
    if (!user) {
      throw new Not_found_error('User not found');
    }
    // eslint-disable-next-line max-len
    const password_matching = await bcrypt.compare(req.body.password, user.password);

    if (password_matching) {
      const token = jwt.sign({
        user_email: user.email,
        user_is_admin: user.is_admin,
      }, process.env.mysecretkey, {expiresIn: '10h'});
      return response(null, token, 'Logged In', res);
    } else {
      throw new Credential_error('Wrong Credentials');
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * Registration.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Duplication_error
 */
const register = async (req, res) => {
  try {
    const user = await user_query.find_user(req.body.email);
    if (user) {
      throw new Duplication_error('User already exists');
    }

    const hash_password = await bcrypt.hash(req.body.password, 10);
    const new_user = req.body;
    new_user.password = hash_password;
    new_user.is_admin = false;
    new_user.is_active = true;
    new_user.dob = new Date(dateFormat(new Date(new_user.dob), 'yyyy-mm-dd'));
    const registered = await user_query.register_user(new_user);

    const token = jwt.sign({
      user_email: new_user.email,
      user_is_admin: new_user.is_admin,
    }, process.env.mysecretkey, {expiresIn: '1h'});

    if (registered) {
      return response(null, token, 'User registration completed', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * New Admin.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Not_found_error
 * @throws Access_denial_error
 */
const new_admin = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;
    const user = await user_query.find_user(req.body.email);
    if (!user) {
      throw new Not_found_error('User not found');
    }
    if (user_is_admin) {
      const admin = await user_query.update_is_admin(req.body.email);
      if (admin) {
        return response(null, admin, 'Admin privileges granted', res);
      } else {
        throw new Not_found_error('User not found');
      }
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

/**
 * All users.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
const get_all_users = async (req, res) => {
  try {
    const skip = Number(req.query.skip);
    const limit = Number(req.query.limit);
    const users = await user_query.find_all_users(skip, limit);
    if (users) {
      return response(null, users, 'Registered users', res);
    } else {
      return response(null, [], 'No user registered', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

module.exports = {
  login,
  register,
  new_admin,
  get_all_users,
};
