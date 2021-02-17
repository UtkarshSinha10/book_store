const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const book_schema=new Schema({
    
    name: {
        type: String, 
        required: true,
    },
    price: {
        type: Number, 
        required: true
    },
    publised: {
        type: Date, 
        default: Date.now()
    },
    pages: {
        type: Number,
        default: 0
    },
    author: {
        type: String, 
        requried: true
    },
    genre: {
        type: String, 
        requried: true
    },
    age_appropriation: {
        type:Number, 
        required: true
    },
    is_discared: {
        type: Boolean,
        default: false
    },
    copies: {
        type: Number,
        default: 1
    }
});

book_schema.index({name: 1}, {unique: true});

module.exports = mongoose.model('Book',book_schema);