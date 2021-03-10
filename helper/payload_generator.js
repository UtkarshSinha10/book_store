const jwt = require('jsonwebtoken');

const payload_generator = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.verify(token, process.env.mysecretkey);
  return payload;
};

module.exports = {
  payload_generator,
};
