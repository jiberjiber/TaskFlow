const { body, validationResult } = require("express-validator");
const { validate } = require("./signupValidate");

const validateTeamData = () => {
  return [
    //Company name cannot be blank
    body("name")
      .trim()
      .exists()
      .isLength({ min: 3, max: 50 })
      .withMessage("Please enter a valid team name."),
  ];
};

module.exports = {
  validateTeamData,
  validate,
};
