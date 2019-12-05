const router = require("express").Router();
const Users = require("./users-model.js");

const required = require("../auth/auth-required-middleware.js");

// get users
router.get("/", required, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
