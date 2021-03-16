/**
 * Response body for all apis.
 * @param {*} err The error if occured.
 * @param {*} result The result from service.
 * @param {string} message The message provided to the user.
 * @param {*} res For sending response to the user.
 */
const response = (err, result, message, res) => {
  if (err) {
    console.log(err);
    res.status(err.code).json({
      data: null,
      message: message,
    });
  } else {
    res.status(200).json({
      data: result,
      message: message,
    });
  }
};

module.exports.response = response;
