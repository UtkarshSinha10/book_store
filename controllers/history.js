const history_service = require('../services/history');

exports.rent_books = (req, res, next) => {
  history_service.rent_books(req, res);
};

exports.amount_spent = (req, res, next) => {
  history_service.amount_spent(req, res);
};
