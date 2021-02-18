const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;


const user_schema=  mongoose.Schema({
    name: { 
        type: String, 
        required: true,
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

user_schema.index({email: 1, name: 1} , {unique: true})

module.exports = mongoose.model('User',user_schema);