import React from "react";
import Phaser from "phaser";

import "./Game.css";

const Game = () => {
  // Initialize Game
  window.onload = () => {
    const game = Phaser.Game(1600, 900, Phaser.AUTO, "game");
  };

  return <div id="gameContainer"> </div>;
};

export default Game;
