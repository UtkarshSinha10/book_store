/* eslint-disable max-len */
const {Database_operation_error} = require('../../errors/errors');
const user = require('../model_schema/user');


exports.find_user = async (email) => {
  try {
    const found_user = await user.collection.findOne({email: email});
    return found_user;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.register_user = async (new_user) => {
  try {
    const register_user = await user.collection.insertOne(new_user);
    return register_user;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.update_is_admin = async (email) => {
  try {
    const admin = await user.updateOne({email: email}, {is_admin: true});
    return admin;
  } catch ( err ) {
    throw new Database_operation_error('Database operation failed');
  }
};

exports.find_all_users = async (skip, limit) => {
  try {
    const users = await user.find().select('name email').skip(skip).limit(limit);
    return users;
  } catch (err) {
    throw new Database_operation_error('Database operation failed');
  }
};
