const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  generateToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        uuid: user.uuid,
        phone: user.phone,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "365d",
      }
    );
  },

  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};
