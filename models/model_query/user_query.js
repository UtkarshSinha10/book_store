const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../model_schema/user');

exports.find_user = (req,res) => {
    User.find({email: req.body.email})
    .exec()   
    .catch(error => {
        if(error){
            res.status(404).json({
                data: null,
                message: "User not found"
            })
        }
    })
    .then( user =>{
        if(user.length<1){
            res.status(404).json({
                data: null,
                message: "User not found"
            })
        }
        return user;
    })
}

exports.register_user = (req,res) => {
    User.find({email: req.body.email})
    .exec()
    .then( user =>{
        if(user.length>0){
            res.status(409).json({
                data: null,
                message: "User already exists"
            })
        } else{
            bcrypt.hash(req.body.password, 10 , (err, hash_password)=>{
                if(err){
                    res.status(500).json({
                        data:null,
                        message: "Error occured"
                    })
                }else{
                    
                    const new_user =req.body;
                    new_user.password=hash_password;
                    new_user.save((err)=>{
                        if(err){
                            res.status(500).json({
                                data: null,
                                message: "Not able to register the user"
                            })
                        }else{
                            res.status(200).json({
                                data:{
                                    name: new_user.name,
                                    email: new_user.email
                                },
                                message: "User registration completed"
                            })
                        }
                    })
                    
                }
            })
        }

    })
}