const JWT = require('jsonwebtoken');


exports.authorization = ( req, res, next )=>{
  const token = req.headers.authorization.split(' ')[1];
  const verified = JWT.verify(token, process.env.mysecretkey);
  if ( verified ) {
    next();
  } else {
    res.status(401).json({
      data: null,
      message: 'Unauthorized',
    });
  }
};
