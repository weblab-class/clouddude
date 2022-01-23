import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound";
import Skeleton from "./pages/Skeleton";
import About from "./pages/About";
import Play from "./pages/Play";
import Home from "./pages/Home";
import LevelEditor from "./pages/LevelEditor";
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
  const [name, setName] = useState("User");
  const [image, setImage] = useState(undefined);
  const [userState, setUser] = useState(undefined);
  const [levelDifficulty, setLevelDifficulty] = useState(0);
  const [levelFunness, setLevelFunness] = useState(0);
  const [invalidAlert, setInvalidAlert] = useState(false);
  const [activeLevel, setActiveLevel] = useState({
    creator: undefined,
    name: "",
    description: "",
    start: { x: 25, y: 25 },
    exit: { x: 1575, y: 875 },
    platforms: [],
    coins: [],
    obstacles: [],
    funness: 0,
    difficulty: 0,
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

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    setImage(res.profileObj.imageUrl);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      if (user.message) {
        setInvalidAlert(true);
      } else {
        setUserId(user._id);
        setName(user.name);
        // post("/api/initsocket", { socketid: socket.id });
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
  const editor = (
    <LevelEditor
      className="App-LevelEditor"
      path="/leveleditor"
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      userId={userId}
      setActiveLevel={setActiveLevel}
      userState={userState}
      publishedLevels={publishedLevels}
      setPublishedLevels={setPublishedLevels}
    />
  );

  return (
    <div className="App-Site">
      <audio autoPlay loop>
        <source
          src="https://www.dropbox.com/s/ud0p5cxdlolnk39/backgroundMusic.mp3?raw=1"
          type="audio/wav"
        />
      </audio>
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
          {userId ? editor : denied}
          <Repository
            className="App-Repository"
            path="/repository"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
            userState={userState}
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
          />
          <About
            className="App-About"
            path="/about"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
            userState={userState}
          />

          <Play
            className="App-Game"
            levelsWon={levelsWon}
            setLevelsWon={setLevelsWon}
            setLevelsPlayed={setLevelsPlayed}
            levelsPlayed={levelsPlayed}
            activeLevel={activeLevel}
            userState={userState}
            levelDifficulty={levelDifficulty}
            setLevelDifficulty={setLevelDifficulty}
            levelFunness={levelFunness}
            setLevelFunness={setLevelFunness}
            userId={userId}
            path="/play"
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
