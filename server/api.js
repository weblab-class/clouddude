/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const connect = require("connect-ensure-login");

// import models so we can interact with the database
const User = require("./models/user");
const Level = require("./models/level");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  return res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// posting a new level
router.post("/level", auth.ensureLoggedIn, (req, res) => {
  const newLevel = new Level({
    creator: req.body.creator,
    name: req.body.name,
    description: req.body.description,
    start: req.body.start,
    exit: req.body.exit,
    platforms: req.body.platforms,
    coins: req.body.coins,
    obstacles: req.body.obstacles,
    funness: Number(req.body.funness),
    difficulty: Number(req.body.difficulty),
  });

  newLevel.save().then((level) => {
    console.log("level from backend: ", level);
    res.send(level);
  });
});

// getting all or filtered levels
router.get("/levels", (req, res) => {
  let actualQuery;
  if (req.query.type === "all") {
    actualQuery = {};
    Level.find(actualQuery, (err, levels) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(levels);
    });
  } else {
    console.log("req.query.name: ", req.query.name.length);
    console.log("req.query.difficulty: ", req.query.difficulty.length);
    console.log("req.query.funness: ", req.query.funness.length);
    if (
      req.query.name.length === 0
      && req.query.userName.length === 0
      && Number(req.query.difficulty) === 0
      && Number(req.query.funness) === 0
    ) {
      actualQuery = {};
    } else {
      actualQuery = {
        name: { $regex: req.query.name },
        creator: { $regex: req.query.userName },
        difficulty: { $gte: req.query.difficulty - 10, $lte: req.query.difficulty + 10 },
        funness: { $gte: req.query.funness - 10, $lte: req.query.funness + 10 },
      };
    }
    Level.find(actualQuery, (err, levels) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(levels);
    });
  }
});

// changing user data
router.post("/user", auth.ensureLoggedIn, (req, res) => {
  User.findOneAndUpdate({ _id: req.body.user._id }, { $set: { name: req.body.user.name } }, () => {
    console.log("user from backend: ", req.body.user);
    res.send(req.body.user);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
