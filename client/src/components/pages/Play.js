import React from "react";
import { Helmet } from "react-helmet";
import Game from "../modules/Game";
import "./Play.css";

const Play = (userState) => {
  return (
    <div className="Play-container">
      <Helmet>
        <title>Play!</title>
      </Helmet>
      <Game className="Play-game" userState={userState} />
    </div>
  );
};

export default Play;
