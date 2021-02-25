const User = require('../model_schema/user');

exports.find_user = async (email) => {
  try {
    const found_user = await User.collection.findOne({email: email});
    return found_user;
  } catch (err) {
    throw err;
  }
};


exports.register_user = async (new_user) => {
  try {
    const register_user = await User.collection.insertOne(new_user);
    return register_user;
  } catch (err) {
    throw err;
  }
};
