const express = require('express');
const app = express();


app.get('/',(req,res)=>{
    console.log('Welcome greet from Server');
    res.send("Hi from Server to Client");
})



app.listen(3000,()=>{
    console.log('Server is running at port 3000')
})