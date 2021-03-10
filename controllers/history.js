const history_service = require('../services/history');

const rent_books = (req, res, next) => {
  history_service.rent_books(req, res);
};

const amount_spent = (req, res, next) => {
  history_service.amount_spent(req, res);
};

const rented_books = (req, res, next) => {
  history_service.rented_books(req, res);
};

const rented_books_to_user = (req, res, next) => {
  history_service.rented_books_to_user(req, res);
};

const return_books = (req, res, next) => {
  history_service.return_books(req, res);
};

module.exports = {
  rent_books,
  amount_spent,
  rented_books,
  rented_books_to_user,
  return_books,
};
