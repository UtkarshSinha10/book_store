const user_service = require('../services/user');

exports.login = (req, res, next)=>{
  user_service.login(req, res);
};

exports.register = (req, res, next)=>{
  user_service.register(req, res);
};

exports.new_admin = (req, res, next) =>{
  user_service.new_admin(req, res);
};

exports.get_all_users = (req, res, next) =>{
  user_service.get_all_users(req, res);
};
