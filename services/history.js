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
    const id = user._id;
    // const current_date= new Date();
    // const age = (current_date.getYear()-user.dob.getYear())+(current_date.getMonth()-user.dob.getMonth())/12+(current_date.getDay()-user.dob.getDay())/(12*30);
    // console.log(age);
    // parseFloat(Number(dateFormat(new Date(), 'yyyy-mm-dd').substr(0, 4))-Number(user.dob.substr(0, 4))+(Number(dateFormat(new Date(), 'yyyy-mm-dd').substr(5, 2))-Number(user.dob.substr(5, 2)))/12+(Number(dateFormat(new Date(), 'yyyy-mm-dd').substr(8, 2))-Number(user.dob.substr(8, 2)))/(30*12)).toFixed(0);
    const count_books_rented = await history_query.count_books_rented(id);

    if (count_books_rented>=10) {
      res.status(400).json({
        data: count_books_rented,
        message: 'Maximum limit to issue books reached',
      });
    } else {
      const new_book_array = book_array.map((book) => book.book_id);
      // console.log(new_book_array);
      const books_to_be_rented = await book_query.book_to_be_rented(1, new_book_array);
      // console.log(books_to_be_rented);
      const avaiable_books_to_be_rented = [];
      for (let i = 0; i< books_to_be_rented.length; i++) {
        const rented = await history_query.count_books_rented_by_book_id(books_to_be_rented[i].id);
        // console.log(rented);
        if (books_to_be_rented[i].copies - rented >0) {
          avaiable_books_to_be_rented.push(books_to_be_rented[i]);
        }
      }

      // console.log(avaiable_books_to_be_rented);
      const rent_books_array = [];
      // console.log(avaiable_books_to_be_rented);
      if ( avaiable_books_to_be_rented.length ==0 ) {
        return res.status(200).json({
          data: [],
          message: 'Books are not either availabe or already rented to you',
        });
      }
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
        message: 'Books rented to you',
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      data: null,
      message: 'Error while renting',
    });
  }
};

exports.return_books = async (req, res) => {
  try {
    const book_array = req.body.book;
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_email = payload.user_email;
    const user = await user_query.find_user(user_email);
    const id = user._id;
    // console.log(user);
    if (!user) {
      res.status(400).json({
        data: null,
        message: 'User not found',
      });
    } else {
      const new_book_array = book_array.map((book) => book.book_id);
      const return_books = await history_query.return_books(id, new_book_array);
      // console.log(return_books);
      // if (return_books) {
      //   console.log(return_books);
      // } else {
      //   ;
      // }
      res.status(200).json({
        data: return_books,
        message: 'Books returned',
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      data: null,
      message: 'Not able to return books',
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
    res.status(400).json({
      data: null,
      message: 'Error calculating amount',
    });
  }
};

exports.rented_books = async (req, res) => {
  try {
    const rented_books = await history_query.find_all_rented_books();
    res.status(200).json({
      data: rented_books,
      message: 'Rented Book Ids and their copies',
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      message: 'Error while finding rented books',
    });
  }
};

exports.rented_books_to_user = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_email = payload.user_email;
    const user_is_admin = payload.user_is_admin;
    const email = req.body.email;
    if ((user_is_admin) || (email === user_email)) {
      const user = await user_query.find_user(user_email);
      if (!user) {
        res.status(404).json({
          data: null,
          message: 'User not found',
        });
      }
      const id = user._id;


      const rented_books_to_user = await history_query.rented_books_to_user(id);
      if (rented_books_to_user.length) {
        res.status(200).json({
          data: rented_books_to_user,
          message: 'Books rented to the user',
        });
      } else {
        res.status(400).json({
          data: [],
          message: 'No rented books to user found',
        });
      }
    } else {
      res.status(403).json({
        data: null,
        message: 'Forbidden: Access is denied',
      });
    }
  } catch (err) {
    res.status(400).json({
      data: null,
      message: 'Error while getting rented books to the user',
    });
  }
};
