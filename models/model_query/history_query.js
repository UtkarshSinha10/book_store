/* eslint-disable max-len */
const History = require('../model_schema/history');

exports.count_rented_books = async () =>{
  try {
    const total_rented_books = History.count({is_returned: false});
    return total_rented_books;
  } catch (err) {
    throw err;
  }
};

exports.find_book_by_book_id = async ()=>{
  try {
    const rented_book_count = await History.count({book_id: book_id});
    return rented_book_count;
  } catch (err) {
    throw err;
  }
};

exports.find_rented_book_in_history = async (book_name) =>{
  try {
    const total_copies_rented = await History.count({book_name: book_name}).populate();
    return total_copies_rented;
  } catch (err) {
    throw err;
  }
};

// exports.find_available_date = async(book_name) => {
//     try{
//         const available_date = await History.findOne({book_name:book_name},'max_date_to_return').populate('book_id');
//         return available_date;

//     }catch(err){
//         throw err;
//     }
// }
