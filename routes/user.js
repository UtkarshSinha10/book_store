/* eslint-disable max-len */
const express = require('express');
const user_controller = require('../controllers/user');
const validator = require('../middlewares/validations/validator');
const authorize = require('../middlewares/authorization/authorize');

// eslint-disable-next-line new-cap
const routes = express.Router();

// API 1
/**
 * Login route.
 * POST Request.
 */
routes.post('/login', validator.login_validator, user_controller.login);

// API 2
/**
 * Registration route.
 * POST Request.
 */
routes.post('/register', validator.register_validator, user_controller.register);

// API 16
/**
 * Admin route.
 * PUT Request.
 */
routes.put('/admin', validator.new_admin_validator, authorize.authorization, user_controller.new_admin);

// API 17
/**
 * All users route.
 * GET Request.
 */
routes.get('/all', authorize.authorization, user_controller.get_all_users);

module.exports = routes;
