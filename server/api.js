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
  const actualQuery = {};
  if (req.query.type === "all") {
    Level.find(actualQuery, (err, levels) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(levels);
    });
  } else {
    if (req.query.name.length !== 0) {
      actualQuery.name = { $regex: req.query.name };
    }
    if (req.query.userName.length !== 0) {
      actualQuery.creator = { $regex: req.query.userName };
    }
    if (Number(req.query.difficulty) !== 100) {
      actualQuery.difficulty = {
        $gte: Number(req.query.difficulty) - 10,
        $lte: Number(req.query.difficulty) + 10,
      };
    }
    if (Number(req.query.funness) !== 100) {
      actualQuery.funness = {
        $gte: Number(req.query.funness) - 10,
        $lte: Number(req.query.funness) + 10,
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

// changing user name
router.post("/user", auth.ensureLoggedIn, (req, res) => {
  User.findOneAndUpdate({ _id: req.body.user._id }, { $set: { name: req.body.user.name } }, () => {
    console.log("user from backend: ", req.body.user);
    res.send(req.body.user);
  });
});

// changing user profile(currently just levels published)
router.post("/profile", auth.ensureLoggedIn, (req, res) => {
  const newLevelsPublished = Number(req.body.user.levelsPublished) + 1;
  User.findOneAndUpdate(
    { _id: req.body.user._id },
    { $set: { levelsPublished: newLevelsPublished } },
    () => {
      const newUser = {
        levelsWon: 0,
        levelsPublished: newLevelsPublished,
      };
      res.send(newUser);
    }
  );
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
