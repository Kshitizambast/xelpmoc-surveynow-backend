module.exports = {
  isEmail: (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  isPhone: (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  },

  isPassword: (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
  },
  isString: (string) => {
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(String(string));
  },

  validateConfirmPassword: (password, confirmPassword) => {
    return password === confirmPassword;
  }
  
};
