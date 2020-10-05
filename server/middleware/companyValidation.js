const { body, validationResult } = require("express-validator");

const { validate } = require("./signupValidate");

const validateCompanyData = () => {
  return [
    //Company name cannot be blank
    body("name")
      .trim()
      .exists()
      .isLength({ min: 1, max: 50 })
      .withMessage("Please enter a valid company name."),
  ];
};

module.exports = {
  validateCompanyData,
  validate
};
