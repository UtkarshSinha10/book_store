/* eslint-disable max-len */
const history_query = require('../models/model_query/history_query');
const user_query = require('../models/model_query/user_query');
const book_query = require('../models/model_query/book_query');
const dateFormat = require('dateformat');

const jwt = require('jsonwebtoken');

exports.rent_books = async (req, res) => {
  try {
    const book_array = req.body.book;
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_email = payload.user_email;
    const user = await user_query.find_user(user_email);
    const id = user.id;
    const age = parseFloat(Number(dateFormat(new Date(), 'yyyy-mm-dd').substr(0, 4))-Number(user.dob.substr(0, 4))+(Number(dateFormat(new Date(), 'yyyy-mm-dd').substr(5, 2))-Number(user.dob.substr(5, 2)))/12+(Number(dateFormat(new Date(), 'yyyy-mm-dd').substr(8, 2))-Number(user.dob.substr(8, 2)))/(30*12)).toFixed(0);
    const count_books_rented = await history_query.count_books_rented(id);
    if (count_books_rented>=10) {
      res.status(400).json({
        data: count_books_rented,
        message: 'Maximum limit to issue books reached',
      });
    } else {
      const new_book_array = book_array.map((book) => book.book_id);
      const books_to_be_rented = await book_query.book_to_be_rented(age, new_book_array);
      const avaiable_books_to_be_rented = [];
      for (let i = 0; i< books_to_be_rented.length; i++) {
        const rented = await history_query.count_books_rented_by_book_id(books_to_be_rented._id);
        if (books_to_be_rented[i].copies - rented >0) {
          avaiable_books_to_be_rented.push(books_to_be_rented[i]);
        }
      }
      const rent_books_array = [];
      for (let i = 0; i< (10-count_books_rented) && i< avaiable_books_to_be_rented.length; i++) {
        rent_books_array.push(
            {
              user_id: id,
              book_id: avaiable_books_to_be_rented[i]._id,
              book_price: avaiable_books_to_be_rented[i].price,
              rent_date: Date(dateFormat(new Date(), 'yyyy-mm-dd')),
              is_returned: false,
              returned_date: Date(dateFormat(new Date(), 'yyyy-mm-dd')),
            },
        );
      }
      const rent_books = await history_query.rent_books(rent_books_array);
      res.status(200).json({
        data: rent_books,
        message: 'message',
      });
    }
  } catch (err) {
    res.status(400).json({
      data: null,
      message: 'Error while renting',
    });
  }
};

exports.amount_spent = async (req, res) => {
  try {
    const email = req.body.email;
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_email = payload.user_email;
    const is_admin = payload.user_is_admin;
    if ((is_admin) || (email === user_email)) {
      const user = await user_query.find_user(email);
      if (!user) {
        res.status(400).json({
          data: null,
          message: 'User not exists',
        });
      }
      const today = new Date();
      const last_date = today.setDate(today.getDate()-100);
      const amount = await history_query.amount_spent(user._id, last_date);
      const user_spent = amount[0].total;
      console.log(amount);
      res.status(200).json({
        data: user_spent,
        message: 'Amount spent by user in last 100 days',
      });
    } else {
      res.status(403).json({
        data: null,
        message: 'Forbidden: Access is denied',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      data: null,
      message: 'Error calculating amount',
    });
  }
};
