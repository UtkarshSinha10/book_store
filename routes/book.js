const express = require('express');
const book_controller = require('../controllers/book');

const routes = express.Router();

routes.post('/new',(req,res,next)=>{
    //
});

routes.post('/updatecopies',(req,res,next)=>{
    //
});

routes.get('/presentbooks',(req,res,next)=>{
    //
});

routes.get('/genre',(req,res,next)=>{
    //
});

routes.get('/author',(req,res,next)=>{
    //
});

routes.post('/updateprice',(req,res,next)=>{
    //
});

routes.post('/updategenre',(req,res,next)=>{
    //
});

routes.delete('/remove',(req,res,next)=>{
    //
});

routes.get('/matchauthor',(req,res,next)=>{
    //
});

routes.post('/date',(req,res,next)=>{
    //
});

module.exports = routes;