const user_query = require('../models/model_query/user_query');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const user = await user_query.find_user(req.body.email);
    if (!user) {
      return res.status(404).json({
        data: null,
        message: 'User not found',
      });
    }

    // eslint-disable-next-line max-len
    const password_matching = await bcrypt.compare( req.body.password, user.password);

    if (password_matching) {
      const token = jwt.sign({
        user_email: user.email,
        user_is_admin: user.is_admin,
      }, process.env.mysecretkey, {expiresIn: '1h'});

      return res.status(200).json({
        data: token,
        message: 'Logged in',
      });
    } else {
      return res.status(401).json({
        data: null,
        message: 'Wrong credentials',
      });
    }
  } catch (error) {
    return res.status(400).json({
      data: null,
      message: 'Some error occured',
    });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await user_query.find_user(req.body.email);
    if (user) {
      return res.status(409).json({
        data: null,
        message: 'User already exists',
      });
    }

    bcrypt.hash(req.body.password, 10, async (err, hash_password) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          data: null,
          message: 'Error occured while password encrption',
        });
      } else {
        const new_user = req.body;
        new_user.password = hash_password;
        new_user.is_admin = false;
        new_user.is_active = true;
        const registered = await user_query.register_user(new_user);

        const token = jwt.sign({
          user_email: new_user.email,
          user_is_admin: new_user.is_admin,
        }, process.env.mysecretkey, {expiresIn: '1h'});

        if (registered) {
          return res.status(200).json({
            data: token,
            message: 'User registration completed',
          });
        } else {
          return res.status(500).json({
            data: null,
            message: 'Registration denied',
          });
        }
      }
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      message: 'Not able to register',
    });
  }
};

exports.new_admin = async ( req, res ) => {
  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.verify(token, process.env.mysecretkey);
  const user_is_admin = payload.user_is_admin;

  if ( user_is_admin ) {
    const admin = await user_query.update_is_admin(req.body.email);
    if (admin) {
      return res.status(200).json({
        data: admin,
        message: 'Admin privileges granted',
      });
    } else {
      return res.status(400).json({
        data: null,
        message: 'User not found',
      });
    }
  } else {
    return res.status(403).json({
      data: null,
      message: 'Forbidden: Access is denied',
    });
  }
};
