const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;


const user_schema= new Schema({
    name: { 
        type: String, 
        required: true
    },
    email: { 
    	type:String,
    	required: true
    },
    password: { 
        type: String, 
        required: true
    },
    is_admin: { 
        type: Boolean, 
        required: true
    },
    dob: {
        type: Date, 
        required: true
    },
    age: { 
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('user',user_schema);