/* eslint-disable max-len */
const express = require('express');
const history_controller = require('../controllers/history');
const authorize = require('../middlewares/authorization/authorize');
const validator = require('../middlewares/validations/validator');

// eslint-disable-next-line new-cap
const routes = express.Router();

routes.get('/amountspent', authorize.authorization, validator.new_admin_validator, history_controller.amount_spent);

// routes.get('/rentedbooks', authorize.authorization, validator.user_validator, history_controller);

routes.post('/rentbooks', authorize.authorization, validator.book_id_array_validator, history_controller.rent_books);

module.exports = routes;
