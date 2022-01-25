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

// posting or updating a new level
router.post("/level", (req, res) => {
  if (req.body.message === "update") {
    let requestQuery;
    if (req.body.levelId) {
      requestQuery = { _id: req.body.levelId };
    } else {
      requestQuery = {
        name: req.body.name,
        numRatings: req.body.numRatings,
        creator: req.body.creator,
      };
    }
    Level.updateOne(
      requestQuery,
      {
        $set: {
          difficulty: req.body.levelDifficulty,
          funness: req.body.levelFunness,
          numRatings: req.body.levelRatings,
        },
      },
      () => {
        res.send({ message: "updating averaged funness and difficulty and numRatings" });
      }
    );
  } else {
    const newLevel = new Level({
      creator: req.body.creator,
      name: req.body.name,
      description: req.body.description,
      start: req.body.start,
      exit: req.body.exit,
      platforms: req.body.platforms,
      coins: req.body.coins,
      obstacles: req.body.obstacles,
      gravity: req.body.gravity,
      funness: Number(req.body.funness),
      difficulty: Number(req.body.difficulty),
      numRatings: 0,
    });

    newLevel.save().then((level) => {
      res.send(level);
    });
  }
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
  } else if (req.query.type === "sort") {
    const sorting = req.query.sortBy;
    if (sorting === "funness") {
      Level.aggregate([{ $sort: { funness: -1 } }]).then((levels) => {
        res.send(levels);
      });
    } else if (sorting === "name") {
      Level.aggregate([
        {
          $project: {
            name: 1,
            platforms: 1,
            coins: 1,
            obstacles: 1,
            creator: 1,
            description: 1,
            start: 1,
            exit: 1,
            funness: 1,
            difficulty: 1,
            gravity: 1,
            insensitive: { $toLower: "$name" },
            numRatings: 1
          },
        },
        { $sort: { insensitive: 1 } },
      ]).then((levels) => {
        res.send(levels);
      });
    } else {
      Level.aggregate([{ $sort: { difficulty: 1 } }]).then((levels) => {
        res.send(levels);
      });
    }
  } else {
    if (req.query.name.length !== 0) {
      actualQuery.name = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.userName.length !== 0) {
      actualQuery.creator = { $regex: req.query.userName, $options: "i" };
    }
    if (Number(req.query.difficulty) !== 0) {
      actualQuery.difficulty = Number(req.query.difficulty);
    }

    if (Number(req.query.funness) !== 0) {
      actualQuery.funness = Number(req.query.funness);
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
    res.send(req.body.user);
  });
});

// getting user information
router.get("/user", auth.ensureLoggedIn, (req, res) => {
  User.find({ _id: req.query._id }, (err, newUser) => {
    if (newUser[0]) {
      res.send(newUser[0]);
    }
  });
});

// getting level number of ratings and current user ratings for difficulty and funness
router.get("/filterlevel", (req, res) => {
  let requestQuery;
  if (req.query._id) {
    requestQuery = { _id: req.query._id };
  } else {
    requestQuery = {
      name: req.query.name,
      numRatings: req.query.numRatings,
      creator: req.query.creator,
    };
  }
  Level.find(requestQuery, (err, level) => {
    if (level[0]) {
      res.send({
        numRatings: level[0].numRatings,
        difficulty: level[0].difficulty,
        funness: level[0].funness,
      });
    }
  });
});

// changing user profile(either number of published levels, levels won, or levels played)
router.post("/profile", (req, res) => {
  if (typeof req.body.user.levelsPublished !== "undefined") {
    const newLevelsPublished = Number(req.body.user.levelsPublished) + 1;
    User.findOneAndUpdate(
      { _id: req.body.user._id },
      { $set: { levelsPublished: newLevelsPublished } },
      () => {
        const newUser = {
          levelsPublished: newLevelsPublished,
        };
        res.send(newUser);
      }
    );
  } else if (typeof req.body.user.levelsWon !== "undefined") {
    const newLevelsWon = Number(req.body.user.levelsWon) + 1;
    User.findOneAndUpdate({ _id: req.body.user._id }, { $set: { levelsWon: newLevelsWon } }, () => {
      const newUser = {
        levelsWon: newLevelsWon,
      };
      res.send(newUser);
    });
  } else if (typeof req.body.user.levelsPlayed !== "undefined") {
    const newLevelsPlayed = Number(req.body.user.levelsPlayed) + 1;
    User.findOneAndUpdate(
      { _id: req.body.user._id },
      { $set: { levelsPlayed: newLevelsPlayed } },
      () => {
        const newUser = {
          levelsPlayed: newLevelsPlayed,
        };
        res.send(newUser);
      }
    );
  } else {
    res.send({ msg: "not logged in" });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
