/**
 * Response body for all apis.
 * @param {*} err The error if occured.
 * @param {*} result The result from service.
 * @param {string} message The message provided to the user.
 * @param {*} res For sending response to the user.
 */
function response(err, result, message, res) {
  if (err) {
    res.status(400).json({
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

module.exports.response =response;
