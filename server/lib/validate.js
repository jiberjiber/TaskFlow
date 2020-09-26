const validateEmail = input => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) ? true : "Please enter a valid email address";

const validateInput = (input) =>
  input.length < 1
    ? "Please enter a valid input greater than 1 character"
    : true;

const validateNumber = (number) =>
  isNaN(parseFloat(number)) ? "Please enter a valid number" : true;

  const validatePassword = (password) => 
    password.length < 6
    ? "Password must be a minimum of 6 characters in length"
    : true;

  
module.exports = { validateEmail, validateInput, validateNumber, validatePassword };
