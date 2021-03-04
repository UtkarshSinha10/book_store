/* eslint-disable max-len */
const {Database_operation_error} = require('../../errors/errors');
const user = require('../model_schema/user');

/**
 * Find user using email
 * @async
 * @param {string} email The user's email id.
 * @return {*} Mongoose object of a user.
 * @throws Database_operation_error.
 */
exports.find_user = async (email) => {
  try {
    const found_user = await user.collection.findOne({email: email});
    return found_user;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Registering new user.
 * @async
 * @param {object} new_user The new user object.
 * @return {*} Mongoose insertion object.
 * @throws Database_operation_error.
 */
exports.register_user = async (new_user) => {
  try {
    const register_user = await user.collection.insertOne(new_user);
    return register_user;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Admin privileges to the user.
 * @async
 * @param {string} email The user's email id.
 * @return {*} Mongoose update object.
 * @throws Database_operation_error.
 */
exports.update_is_admin = async (email) => {
  try {
    const admin = await user.updateOne({email: email}, {is_admin: true});
    return admin;
  } catch ( err ) {
    throw new Database_operation_error('Database operation failed');
  }
};

/**
 * Find all the active users.
 * @async
 * @param {Number} skip The number of documents to skip.
 * @param {Number} limit The number of documents to be returned.
 * @return {*} Mongoose objects of found user.
 * @throws Database_operation_error
 */
exports.find_all_users = async (skip, limit) => {
  try {
    const users = await user.find({is_active: true}).select('name email').skip(skip).limit(limit);
    return users;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};
