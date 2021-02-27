/* eslint-disable max-len */
const Mongoose = require('mongoose');
const History = require('../model_schema/history');

exports.count_books_rented = async (id) => {
  try {
    const count = await History.countDocuments({'$and': [{user_id: id}, {is_returned: true}]});
    return count;
  } catch (err) {
    throw (err);
  }
};

exports.rent_books = async (rent_books_array) => {
  try {
    const rent_books = await History.insertMany(rent_books_array);
    return rent_books;
  } catch (err) {
    throw (err);
  }
};

exports.count_books_rented_by_book_id = async (id) => {
  try {
    const count = History.countDocuments({'$and': [{book_id: id}, {is_returned: true}]});
    return count;
  } catch (err) {
    throw err;
  }
};

exports.amount_spent = async (id, last_date) => {
  try {
    console.log(last_date);
    const date = new Date(new Date(null).setSeconds(last_date/1000));
    // eslint-disable-next-line new-cap
    const amount = await History.aggregate([{'$match': {user_id: Mongoose.ObjectId(id), rent_date: {'$gte': date}}}, {'$group': {_id: null, total: {'$sum': '$book_price'}}}]);
    return amount;
  } catch (err) {
    throw err;
  }
};

// exports.count_rented_books = async () =>{
//   try {
//     const total_rented_books = History.count({is_returned: false});
//     return total_rented_books;
//   } catch (err) {
//     throw err;
//   }
// };

// exports.find_book_by_book_id = async ()=>{
//   try {
//     const rented_book_count = await History.count({book_id: book_id});
//     return rented_book_count;
//   } catch (err) {
//     throw err;
//   }
// };

// exports.find_rented_book_in_history = async (book_name) =>{
//   try {
//     const total_copies_rented = await History.count({book_name: book_name}).populate();
//     return total_copies_rented;
//   } catch (err) {
//     throw err;
//   }
// };

// exports.find_available_date = async(book_name) => {
//     try{
//         const available_date = await History.findOne({book_name:book_name},'max_date_to_return').populate('book_id');
//         return available_date;

//     }catch(err){
//         throw err;
//     }
// }
