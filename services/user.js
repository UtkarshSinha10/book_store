/* eslint-disable valid-jsdoc */
const user_query = require('../models/model_query/user_query');
const dateFormat = require('dateformat');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  Not_found_error,
  Credential_error,
  Duplication_error,
  Access_denial_error,
} = require('../errors/errors');

/**
 * Login.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 * @throws Credential_error
 * @throws Not_found_error
 */
const login = async (email, password) => {
  try {
    const user = await user_query.find_user(email);
    if (!user) {
      throw new Not_found_error('User not found');
    }
    const password_matching = await bcrypt.compare(
        password,
        user.password,
    );

    if (password_matching) {
      const token = jwt.sign({
        user_email: user.email,
        user_is_admin: user.is_admin,
      }, process.env.mysecretkey, {expiresIn: '10h'});
      return token;
    } else {
      throw new Credential_error('Wrong Credentials');
    }
  } catch (err) {
    throw err;
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
const register = async (new_user) => {
  try {
    const user = await user_query.find_user(new_user.email);
    if (user) {
      throw new Duplication_error('User already exists');
    }

    const hash_password = await bcrypt.hash(new_user.password, 10);
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
      return token;
    }
  } catch (err) {
    throw err;
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
const new_admin = async (email, payload) => {
  try {
    const user_is_admin = payload.user_is_admin;
    const user = await user_query.find_user(email);
    if (!user) {
      throw new Not_found_error('User not found');
    }
    if (user_is_admin) {
      const admin = await user_query.update_is_admin(email);
      if (admin) {
        return admin;
      } else {
        throw new Not_found_error('User not found');
      }
    } else {
      throw new Access_denial_error('Forbidden: Access is denied');
    }
  } catch (err) {
    throw err;
  }
};

/**
 * All users.
 * @async
 * @param {*} req The HTTP request.
 * @param {*} res The HTTP response.
 * @return {*} Sends Response body to response function.
 */
const get_all_users = async (skip, limit, payload) => {
  try {
    if (payload.user_is_admin) {
      const users = await user_query.find_all_users(skip, limit);
      return users;
    } else {
      throw Access_denial_error;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  login,
  register,
  new_admin,
  get_all_users,
};
