const history_service = require('../services/history');
const {response} = require('../response/response');
const {payload_generator} = require('../helper/payload_generator');

const rent_books = async (req, res, next) => {
  try {
    const payload = payload_generator(req);
    const rent_response = await history_service.rent_books(
        req.body.book,
        payload,
    );
    if (rent_response) {
      return response(null, rent_response, 'Rental information', res);
    } else {
      return response(null, [], 'Books are not available', res);
    }
  } catch (err) {
    next(err);
  }
};

const amount_spent = async (req, res, next) => {
  try {
    const payload = payload_generator(req);
    const email = req.body.email;
    const amount = await history_service.amount_spent(email, payload);
    if (!amount) {
      return response(null, 0, 'Amount spent is zero in last 100 days', res);
    } else {
      return response(null, user_spent, 'Amount spent in last 100 days', res);
    }
  } catch (err) {
    next(err);
  }
};

const rented_books = async (req, res, next) => {
  try {
    const rented_books = await history_service.rented_books();
    return response(null, rented_books, 'Rented books id and its copies', res);
  } catch (err) {
    next(err);
  }
};

const rented_books_to_user = async (req, res, next) => {
  try {
    const payload = payload_generator(req);
    const email = req.body.email;
    const rented_books = await history_service.rented_books_to_user(
        email,
        payload,
    );
    if (rented_books_to_user.length) {
      return response(null, rented_books, 'Books to user', res);
    } else {
      return response(null, [], 'No rented books to user found', res);
    }
  } catch (err) {
    next(err);
  }
};

const return_books = async (req, res, next) => {
  try {
    const payload = payload_generator(req);
    const book_array = req.body.book;
    const return_books = await history_service.return_books(
        book_array,
        payload,
    );
    return response(null, return_books, 'Books returned', res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  rent_books,
  amount_spent,
  rented_books,
  rented_books_to_user,
  return_books,
};
