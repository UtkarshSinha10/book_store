const history_service = require('../services/history');

exports.rent_books = (req, res, next) => {
  history_service.rent_books(req, res);
};

exports.amount_spent = (req, res, next) => {
  history_service.amount_spent(req, res);
};

exports.rented_books = (req, res, next) => {
  history_service.rented_books(req, res);
};

exports.rented_books_to_user = (req, res, next) => {
  history_service.rented_books_to_user(req, res);
};

exports.return_books = (req, res, next) => {
  history_service.return_books(req, res);
};
