const express = require('express');
const user_controller = require('../controllers/user');
const validator = require('../middlewares/validations/validator')

const routes = express.Router();

routes.post('/login',validator.login_validator,user_controller.login);

routes.post('/register',validator.register_validator,user_controller.register);

module.exports = routes;