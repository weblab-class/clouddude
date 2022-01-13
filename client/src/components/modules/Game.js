import React from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";

import "./Game.css";

const Game = () => {
  function preload() {
    this.load.setBaseURL("http://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  }

  function create() {
    this.add.image(400, 300, "sky");

    const logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
  }

  function responsivelyResize() {
    const gameId = document.getElementById("game");
    gameId.style.width = "80%";
    gameId.style.height = "80%";
  }

  function update() {
    // Resize game to fit window
    responsivelyResize();
  }

  const game = {
    width: 1600,
    height: 900,
    type: Phaser.AUTO,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
    },
    scene: {
      preload,
      create,
      update,
    },
    callbacks: {
      postBoot: (settings) => {
        settings.canvas.style.width = "80%";
        settings.canvas.style.height = "80%";
      },
    },
  };
  const initialize = true;
  return (
    <div id="game">
      <IonPhaser className="Game-container" game={game} initialize={initialize} />;
    </div>
  );
};

export default Game;
