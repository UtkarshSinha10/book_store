const express = require('express');
const user_service = require('../services/user');


exports.login = (req,res,next)=>{
    user_service.login(req,res);
}

exports.register = (req,res,next)=>{
    user_service.register(req,res);
}