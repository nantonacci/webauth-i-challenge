const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
  if (req.session.loggedin && req.session.loggedin === true) {
    next();
  } else {
    res.status(400).json({ message: "no dice" });
  }
};
