/* eslint-disable max-len */
const express = require('express');
const user_controller = require('../controllers/user');
const validator = require('../middlewares/validations/validator');
const authorize = require('../middlewares/authorization/authorize');

// eslint-disable-next-line new-cap
const routes = express.Router();

// API 1
routes.post('/login', validator.login_validator, user_controller.login);

// API 2
routes.post('/register', validator.register_validator, user_controller.register);

// API 16
routes.put('/admin', validator.new_admin_validator, authorize.authorization, user_controller.new_admin);

// API 17
routes.get('/all', authorize.authorization, user_controller.get_all_users);

module.exports = routes;
