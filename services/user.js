const user_query = require('../models/model_query/user_query');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.login = async (req,res)=>{

    const user = await user_query.find_user(req,res);
    const password = user[0].password;
    
    bcrypt.compare( req.body.password, password , (err,result) =>{
        
        if(err){
            res.status(404).json({
                data:null,
                message: "Wrong credentials"
            })
        }

        const token = jwt.sign({
            user_email: user[0].email,
            user_is_admin: user[0].is_admin
        })

        res.status(200).json({
            data: token,
            message: "Logged in"
        })

    })
}


exports.register = (req,res,next) => {
;
}