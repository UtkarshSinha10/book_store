const JWT = require('jsonwebtoken');



module.exports = ( req, res, next )=>{

    const token = req.headers.authorization.split(" ")[1];
    const verified = JWT.verify(token,process.env);

}