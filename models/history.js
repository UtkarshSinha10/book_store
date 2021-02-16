const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const history_schema= new Schema({

    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    book_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    book_price: { 
        type: Number, 
        required: true
    },
    date: { 
        type: Date, 
        required: true
    },
    is_returned: { 
        type: Boolean, 
        default: false
    },
    max_date_to_return: {
        type: Date,
        default: Date.now()+(14*24*60*60)
    }
    // return_date: {
    // 	type: Date
    // } //will be addded when a book return is made
})

module.exports = mongoose.model('history',history_schema);