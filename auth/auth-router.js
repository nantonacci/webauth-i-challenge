const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

// post register
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// post log in
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedin = true;
        res
          .status(200)
          .json({ message: `Hi, ${username}. You are logged in.` });
      } else {
        res.status(401).json({ message: "Login unsuccessful. Try again." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// delete log out
router.delete("/logout", (req, res) => {
  if (req.session) {
    console.log(req.session);

    req.session.destroy(err => {
      if (err) {
        res.status(400).send("you are not allowed to leave");
      } else {
        res.send("alright, you can go...");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
