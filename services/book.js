/* eslint-disable max-len */
const book_query = require('../models/model_query/book_query');
const history_query = require('../models/model_query/history_query');
const jwt = require('jsonwebtoken');

exports.new_book = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;

    if (user_is_admin) {
      const found_book = await book_query.find_a_book_by_name(req.body);

      if (found_book) {
        return res.status(409).json({
          data: null,
          message: 'Book already exist',
        });
      }
      const new_book = await book_query.create_new_book(req.body);
      if (!new_book) {
        return res.status(400).json({
          data: null,
          message: 'Error while adding new book',
        });
      }
      return res.status(200).json({
        data: null,
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
      message: 'Error while adding new book',
    });
  }
};

exports.update_copies =async (req, res) =>{
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;

    if (user_is_admin) {
      const found_book = await book_query.find_a_book_by_name(req.body);
      if (!found_book) {
        return res.status(404).json({
          data: null,
          message: 'Book not found',
        });
      } else {
        const update_copies = await book_query.update_copies_of_a_book(req.body);
        if (!update_copies) {
          return res.status().json({
            data: null,
            message: 'Updation failed',
          });
        }
        return res.status(200).json({
          data: update_copies,
          message: 'Copies successfully updated',
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

exports.present_books = async (req, res) =>{
  try {
    const book_rented = await history_query.count_rented_books();
    const total_book_in_store = await book_query.count_total_books();
    if (book_rented >=0 && total_book_in_store>=0) {
      return res.status(200).json({
        data: total_book_in_store.total-book_rented,
        message: 'Total books in store is returned',
      });
    } else {
      return res.status(400).json({
        data: null,
        message: 'Something wrong in databse',
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: null,
      message: 'Error while counting books',
    });
  }
};

exports.books_by_genre = async (req, res) =>{
  try {
    const book_list = await book_query.books_by_genre(req.body.genre);
    if (book_list.length>0) {
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

exports.books_by_author = async (req, res) =>{
  try {
    const book_list = await book_query.books_by_author(req.body.author);
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

exports.update_price =async (req, res) =>{
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;

    if (user_is_admin) {
      const found_book = await book_query.find_a_book_by_name(req.body);
      if (!found_book) {
        return res.status(404).json({
          data: null,
          message: 'Book not found',
        });
      } else {
        const update_price = await book_query.update_price_of_book(req.body);
        if (!update_price) {
          return res.status().json({
            data: null,
            message: 'Updation failed',
          });
        }
        return res.status(200).json({
          data: update_price,
          message: 'Price successfully updated',
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
      message: 'Error while updating price of book',
    });
  }
};

exports.update_genre =async (req, res) =>{
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.mysecretkey);
    const user_is_admin = payload.user_is_admin;

    if (user_is_admin) {
      const found_book = await book_query.find_a_book_by_name(req.body);
      if (!found_book) {
        return res.status(404).json({
          data: null,
          message: 'Book not found',
        });
      } else {
        const update_genre = await book_query.update_genre_of_book(req.body);
        if (!update_genre) {
          return res.status().json({
            data: null,
            message: 'Updation failed',
          });
        }
        return res.status(200).json({
          data: update_genre,
          message: 'Genre successfully updated',
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
      message: 'Error while updating genre of book',
    });
  }
};

exports.remove_book = async (req, res) => {
  try {
    const found_book = await book_query.find_a_book_by_name(req.body.name);
    if (!found_book) {
      return res.status(404).json({
        data: null,
        message: 'No such book found',
      });
    }
    const rented_book_count = history_query.find_book_by_book_id(found_book.book_id);

    if (rented_book_count>0) {
      return res.status(400).json({
        data: null,
        message: 'Book is rented, so removal not possible',
      });
    } else {
      const removed_book = book_query.remove_book(req.book_name);
      return res.status(200).json({
        data: removed_book,
        message: 'Book removed',
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
    const book_list = await book_query.books_by_author_match(req.body.book_author);
    if (book_list.length()>0) {
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
      message: 'Error while searching books based on matching author\'s name',
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
// }
