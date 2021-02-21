const express = require('express');
const history_controller = require('../controllers/history');
const authorize = require('../middlewares/authorization/authorize');
const validator = require('../middlewares/validations/validator')

const routes = express.Router();

// routes.get('/amountspent',authorize.authorization,validator.user_validator,history_controller.amount_spent)

// routes.get('/rentedbooks',authorize.authorization,validator.user_validator,history_controller.rented_books)

// routes.post('/rentbook',authorize.authorization,validator.user_validator,history_controller.rent_book)


module.exports = routes;