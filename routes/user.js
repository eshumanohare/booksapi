const express = require("express");
const router = express.Router();

users = [
  {
    username: "carter",
    password: "carter",
  },
];

router.get("/", (req, res) => {
  const usernames = users.map((user) => user.username);
  res.send(JSON.stringify({ usernames }, null, 1));
});

router.post("/register", (req, res) => {
  user = {
    username: req.query.username,
    password: req.query.password,
  };
  users.push(user);
  res.send(`Registered user: ${JSON.stringify({ user }, null, 2)}`);
});

router.post("/login", (req, res) => {
  const user = users.filter((user) => user.username === req.query.username);
  if (user.password === req.query.password) {
    res.send("You are Logged In");
  } else {
    res.send("Invalid Password");
  }
});

module.exports = router;
