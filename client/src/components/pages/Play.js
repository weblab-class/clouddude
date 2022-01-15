import React from "react";
import { Helmet } from "react-helmet";
import Game from "../modules/Game";
import "./Play.css";

const Play = ({ userState, activeLevel }) => {
  return (
    <div className="Play-container">
      <Helmet>
        <title>Play!</title>
      </Helmet>
      <Game
        className="Play-game"
        activeLevel={activeLevel}
        isEditing={false}
        userState={userState}
      />
    </div>
  );
};

export default Play;
