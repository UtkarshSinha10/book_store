const JWT = require('jsonwebtoken');
const {Authentication_error} = require('../../errors/errors');
const {response} = require('../../response/response');


/**
 * Authorization function
 * @param {*} req The request.
 * @param {*} res The response.
 * @param {*} next The next.
 * @return {*} Return to response.js
 */
function authorization( req, res, next ) {
  try {
    if (!req.headers || !req.headers.authorization) {
      throw new Authentication_error('No Authentication Key');
    }
    const token = req.headers.authorization.split(' ')[1];
    const verified = JWT.verify(token, process.env.mysecretkey);
    if ( verified ) {
      next();
    } else {
      throw new Authentication_error('Unauthorized Key');
    }
  } catch (err) {
    if (err instanceof JWT.TokenExpiredError) {
      return response(err, null, 'Token expired, login timout', res);
    }
    return response(err, null, err.message, res);
  }
};

module.exports.authorization = authorization;
