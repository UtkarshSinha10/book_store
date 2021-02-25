const JWT = require('jsonwebtoken');


exports.authorization = ( req, res, next )=>{
  try {
    if (!req.headers || !req.headers.authorization) {
      return res.status(403).json({
        data: null,
        message: 'No Authentication Key',
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    const verified = JWT.verify(token, process.env.mysecretkey);
    if ( verified ) {
      next();
    } else {
      return res.status(401).json({
        data: null,
        message: 'Unauthorized',
      });
    }
  } catch (err) {
    if (err instanceof JWT.TokenExpiredError) {
      return res.status(440).json({
        data: null,
        message: 'Token expired, login timout',
      });
    }
  }
};
