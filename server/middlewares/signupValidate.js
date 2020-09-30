const { body, validationResult } = require("express-validator");
const validateSignupData = () => {
  return [
    //firstName must be a string with at least 2 characters
    body("firstName")
      .trim()
      .exists()
      .isLength({ min: 2, max: 50 })
      .withMessage("Please enter a valid name."),

    //lastName must be a string with at least 1 character
    body("lastName")
      .trim()
      .exists()
      .isLength({ min: 1, max: 50 })
      .withMessage("Please enter a valid name."),

    //username must be at least 3 characters
    body("username")
      .trim()
      .exists()
      .isAlphanumeric()
      .withMessage("Username cannot contin special characters.")
      .isLength({ min: 3, max: 50 })
      .withMessage("Username must be at least 3 characters long."),
    // password must be at least 5 chars long
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    // Check for correct email syntax
    body("email")
      .isEmail()
      .trim()
      .normalizeEmail()
      .withMessage("Please enter a valid email"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validateSignupData,
  validate,
};
