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
  const [userState, setUser] = useState(undefined);
  const [activeLevel, setActiveLevel] = useState(undefined);

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
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setName(user.name);
      post("/api/initsocket", { socketid: socket.id });
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
        // publishedLevels="hardcorded 30"
        // levelsWon="hardcorded 20"
        // userName={name}
      />
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

        <Play className="App-Game" activeLevel={activeLevel} userState={userState} path="/play" />
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
