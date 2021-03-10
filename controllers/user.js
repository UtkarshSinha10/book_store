const user_service = require('../services/user');

const login = (req, res, next)=>{
  user_service.login(req, res);
};

const register = (req, res, next)=>{
  user_service.register(req, res);
};

const new_admin = (req, res, next) =>{
  user_service.new_admin(req, res);
};

const get_all_users = (req, res, next) =>{
  user_service.get_all_users(req, res);
};

module.exports = {
  login,
  register,
  new_admin,
  get_all_users,
};
