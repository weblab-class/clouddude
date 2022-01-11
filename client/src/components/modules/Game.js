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

    const particles = this.add.particles("red");

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }

  const game = {
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
    scene: {
      preload,
      create,
    },
  };
  const initialize = true;
  return <IonPhaser className="Game-container" game={game} initialize={initialize} />;
};

export default Game;
