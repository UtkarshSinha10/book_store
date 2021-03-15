const user_service = require('../services/user');
const {response} = require('../response/response');

const login = async (req, res, next)=>{
  try {
    const email = req.body.email;
    const password = req.body.password;
    const token = await user_service.login(email, password);
    if (token) {
      return response(null, token, 'Logged In', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const register = async (req, res, next)=>{
  try {
    const new_user = req.body;
    const token = await user_service.register(new_user);
    if (token) {
      return response(null, token, 'User registration completed', res);
    }
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const new_admin = async (req, res, next) =>{
  try {
    const email = req.body.email;
    const payload = payload_generator(req);
    const admin = await user_service.new_admin(email, payload);
    return response(null, admin, 'Admin privileges granted', res);
  } catch (err) {
    return response(err, null, err.message, res);
  }
};

const get_all_users = async (req, res, next) =>{
  try {
    const skip = Number(req.query.skip);
    const limit = Number(req.query.limit);
    const payload = payload_generator(req);
    const users = await user_service.get_all_users(skip, limit, payload);
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
