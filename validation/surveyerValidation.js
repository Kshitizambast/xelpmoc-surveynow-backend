const validator = require("./validator");

module.exports = {
  surveyerSignupValidation: (email, phone, name, password) => {
    let errors = {};

    if (!email || !phone || !name || !password) {
      errors.fieldEmpty = "All fields are required";
    }
    if (!validator.isEmail(email)) {
      errors.email = "Please enter a valid email";
    }
    if (!validator.isPhone(phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!validator.isString(name)) {
      errors.name = "Please enter a valid name";
    }
    if (!validator.isPassword(password)) {
      errors.password = "Please enter a valid password";
    }
    return {
        error: errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    };
   
  },

  surveyerLoginValidation:  (email, password) => {
    let errors = {};
    if (!email || !password) {
        errors.fieldEmpty = "All fields are required";
    }
    if (!validator.isEmail(email)) {
        errors.email = "Please enter a valid email";
    }
    if (!validator.isString(password)) {
        errors.password = "Please enter a valid password";
    }
    return {
        error: errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    };
  },
};
