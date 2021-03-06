import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound";
import Skeleton from "./pages/Skeleton";
import About from "./pages/About";
import Home from "./pages/Home";
import Repository from "./pages/Repository";
import NavBar from "./modules/NavBar";
import Footer from "./modules/Footer";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";
import PermissionDenied from "./pages/PermissionDenied";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [name, setName] = useState("");
  const [image, setImage] = useState(undefined);
  const [userState, setUser] = useState(undefined);
  const [levelDifficulty, setLevelDifficulty] = useState(0);
  const [levelFunness, setLevelFunness] = useState(0);
  const [invalidAlert, setInvalidAlert] = useState(false);
  const [levelID, setLevelID] = useState(undefined);
  const [activeLevel, setActiveLevel] = useState({
    creator: "N/A",
    name: "No Level Selected",
    description: "N/A",
    start: { x: 25, y: 25 },
    exit: { x: 1575, y: 875 },
    gravity: { x: 0, y: 600 },
    platforms: [],
    coins: [],
    obstacles: [],
    funness: 0,
    difficulty: 0,
    numRatings: 0,
    avgFunness: 0,
    avgDifficulty: 0,
  });

  const [publishedLevels, setPublishedLevels] = useState(0);
  const [levelsWon, setLevelsWon] = useState(0);
  const [levelsPlayed, setLevelsPlayed] = useState(0);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setName(user.name);
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      const body = { _id: userId };
      get("/api/user", body).then((user) => {
        if (user) {
          setName(user.name);
          setLevelsWon(user.levelsWon);
          setLevelsPlayed(user.levelsPlayed);
          setPublishedLevels(user.levelsPublished);
        }
      });
    }
  }, [userId]);

  const handleLogin = (res) => {
    setImage(res.profileObj.imageUrl);
    localStorage.setItem("imageurl", res.profileObj.imageUrl);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      if (user.message) {
        setInvalidAlert(true);
      } else {
        setUserId(user._id);
        setName(user.name);
      }
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const denied = (
    <PermissionDenied
      path="/leveleditor"
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      userId={userId}
      userState={userState}
    />
  );

  return (
    <div className="App-Site">
      <NavBar
        className="App-Navbar"
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
        userState={userState}
        publishedLevels={publishedLevels}
        setPublishedLevels={setPublishedLevels}
        levelsWon={levelsWon}
        setLevelsWon={setLevelsWon}
        setLevelsPlayed={setLevelsPlayed}
        levelsPlayed={levelsPlayed}
        invalidAlert={invalidAlert}
        setInvalidAlert={setInvalidAlert}
        image={image}
        name={name}
        setName={setName}
      />
      <div className="App-body">
        <Router>
          <Skeleton
            path="/example"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
            userState={userState}
          />
          {userId ? NotFound : NotFound}
          <About
            className="App-About"
            path="/about"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
            userState={userState}
          />
          <Home
            className="App-Home"
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
            userState={userState}
          />
          <NotFound default />
        </Router>
      </div>
      <Footer
        className="fixed-bottom"
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
        user={userState}
      />
    </div>
  );
};

export default App;
