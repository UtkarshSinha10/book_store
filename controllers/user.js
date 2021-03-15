const user_service = require('../services/user');
const {response} = require('../response/response');

const login = async (req, res, next)=>{
  try {
    const token = await user_service.login(req, res);
    if (token) {
      return response(null, token, 'Logged In', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const register = async (req, res, next)=>{
  try {
    const token = await user_service.register(req, res);
    if (token) {
      return response(null, token, 'User registration completed', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const new_admin = async (req, res, next) =>{
  try {
    const admin = await user_service.new_admin(req, res);
    return response(null, admin, 'Admin privileges granted', res);
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const get_all_users = async (req, res, next) =>{
  try {
    const users = await user_service.get_all_users(req, res);
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
