const express = require('express');
const body_parser = require('body-parser');

const user_routes = require('./routes/user');
const book_routes = require('./routes/book');
const history_routes = require('./routes/history');

const app = express();

app.use(body_parser.json());

app.get('/',(req,res)=>{
    console.log('Welcome greet from Server');
    res.send("Hi from Server to Client");
});


app.use('/user',user_routes);
app.use('/book',book_routes);
app.use('/history',history_routes);


app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});