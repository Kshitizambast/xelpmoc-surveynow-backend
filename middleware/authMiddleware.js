const verifyToken = require("../utils/jwtUtils").verifyToken;

module.exports = {
  autherizeUser: () => {
    return (req, res, next) => {
      const token =
        req.headers["x-access-token"] || req.headers["authorization"];
      if (token) {
        const decoded = verifyToken(token);
        if (decoded) {
          req.user = decoded;
          next();
        } else {
          res.status(401).json({
            error: "Invalid token",
          });
        }
      } else {
        res.status(401).json({
          error: "Not authorized",
        });
      }
    };
  },
};
