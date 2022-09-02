const { validationResult } = require("express-validator");

function validate(req, res, next) {
  const error = validationResult(req);

  console.log(req.body.language_id);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(400).json({ error: error.array() });
  } else {
    next();
  }
}

const validationUtils = { validate };
module.exports = validationUtils;
