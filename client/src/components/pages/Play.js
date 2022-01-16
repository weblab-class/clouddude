import React from "react";
import { Helmet } from "react-helmet";
import Game from "../modules/Game";
import "./Play.css";

const Play = ({
  userState, activeLevel, levelsWon, setLevelsWon, userId
}) => {
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
        levelsWon={levelsWon}
        setLevelsWon={setLevelsWon}
        userId={userId}
      />
    </div>
  );
};

export default Play;
