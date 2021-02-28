/* eslint-disable max-len */
const book_query = require('../models/model_query/book_query');
const history_query = require('../models/model_query/history_query');
const jwt = require('jsonwebtoken');
const dateFormat = require('dateformat');

exports.new_book = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;

    if (user_is_admin) {
      const new_book = req.body;
      new_book.is_discarded=false;
      new_book.published= new Date(dateFormat(new Date(new_book.published), 'yyyy-mm-dd'));
      const found_book = await book_query.find_a_book_by_name(new_book.name);

      if (found_book) {
        return res.status(409).json({
          data: null,
          message: 'Book already exist',
        });
      }
      const book = await book_query.create_new_book(new_book);
      if (!book) {
        return res.status(400).json({
          data: null,
          message: 'Error while adding new book',
        });
      }
      return res.status(200).json({
        data: book.ops[0],
        message: 'Done',
      });
    } else {
      return res.status(403).json({
        data: null,
        message: 'Forbidden: Access is denied',
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: null,
      message: 'Error while adding a new book',
    });
  }
};

exports.update_book = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;

    if (user_is_admin) {
      const found_book = await book_query.find_a_book_by_id(req.body.book_id);
      if (!found_book) {
        return res.status(404).json({
          data: null,
          message: 'Book not found',
        });
      } else {
        const new_book = {};
        if (req.body.copies) {
          new_book.copies = req.body.copies;
        }
        if (req.body.genre) {
          new_book.genre = req.body.genre;
        }
        if (req.body.price) {
          new_book.price = Number(req.body.price);
        }
        const update_book = await book_query.update_book(req.body.book_id, new_book);
        if (!update_book) {
          return res.status().json({
            data: null,
            message: 'Updation failed',
          });
        }
        return res.status(200).json({
          data: update_book,
          message: 'Updation successful',
        });
      }
    } else {
      return res.status(403).json({
        data: null,
        message: 'Forbidden: Access is denied',
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: null,
      message: 'Error while updating copies of book',
    });
  }
};

exports.current_books = async (req, res) => {
  try {
    const skip = req.query.skip;
    const limit = req.query.limit;
    const books_registered_in_store = await book_query.books_registered_in_store(skip, limit);
    const books_array = [];
    for (let index = 0; index < books_registered_in_store.length; index++) {
      const book_id = books_registered_in_store[index]._id;
      const total_copies = books_registered_in_store[index].copies;
      const rented_copies_of_book = await history_query.rented_copies_of_book(book_id);
      if (rented_copies_of_book.length) {
        books_array.push({
          book_id: book_id,
          total_copies: total_copies,
          rented_copies: rented_copies_of_book[0].total,
          present_copies: total_copies - rented_copies_of_book[0].total,
        });
      } else {
        books_array.push({
          book_id: book_id,
          total_copies: total_copies,
          rented_copies: 0,
          present_copies: total_copies,
        });
      }
    }
    res.status(200).json({
      data: books_array,
      message: 'Books present details',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      data: null,
      message: 'Not able to get current books',
    });
  }
};

exports.books_by_genre = async (req, res) => {
  try {
    const genre = req.query.genre;
    const skip = req.query.skip;
    const limit = Number(req.query.limit);
    const book_list = await book_query.books_by_genre(genre, skip, limit);
    if (book_list) {
      return res.status(200).json({
        data: book_list,
        message: 'Search by genre successful',
      });
    } else {
      return res.status(200).json({
        data: [],
        message: 'No books belong to the given genre',
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: null,
      message: 'Error while searching books by genre',
    });
  }
};

exports.books_by_author = async (req, res) => {
  try {
    const author = req.query.author;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const book_list = await book_query.books_by_author(author, skip, limit);
    if (book_list.length>0) {
      return res.status(200).json({
        data: book_list,
        message: 'Search by author successful',
      });
    } else {
      return res.status(200).json({
        data: [],
        message: 'No books written by given author',
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: null,
      message: 'Error while searching books by author',
    });
  }
};

exports.remove_books = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;
    if (user_is_admin) {
      const book_array = req.body.book;
      const new_book_array = book_array.map((book) => book.book_id);
      const book_modification_details = await book_query.remove_book(new_book_array);
      return res.status(200).json({
        data: `Books removed ${book_modification_details.nModified}`,
        message: 'Book removed',
      });
    } else {
      return res.status(403).json({
        data: null,
        message: 'Forbidden: Access is denied',
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: null,
      message: 'Error while removing a book',
    });
  }
};

exports.books_by_author_match = async (req, res) => {
  try {
    const author = req.query.author;
    const skip = Number(req.query.skip);
    const limit = Number(req.query.limit);
    const book_list = await book_query.books_by_author_match(author, skip, limit);
    if (book_list.length>0) {
      return res.status(200).json({
        data: book_list,
        message: 'Search by matching author\'s name successful',
      });
    } else {
      return res.status(200).json({
        data: [],
        message: 'No books written by given matching author\'s name',
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: null,
      message: 'Error while searching books',
    });
  }
};

// exports.book_by_earliest_date = async (req,res) => {
//     try{
//         const book = await book_query.find_a_book_by_name(req.body.book_name);
//         const copies_of_book_rented = await history_query.find_rented_book_in_history(req.body.book_name);
//         if(book.copies - copies_of_book_rented>0){
//             res.status(200).json({
//                 data : book,
//                 message: "Book is available to be rented"
//             })
//         }else{
//             const earliest_date = await history_query.find_available_date(req.body.book_name);
//             if(earliest_date.length){

//             }else{

//             }
//         }
//     }catch(err){
//         res.status().json({
//             data: null,
//             message: "Error occured"
//         })
//     }
// };
