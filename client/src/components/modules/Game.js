import React, { useEffect } from "react";
import Phaser from "phaser";

import "./Game.css";

const Game = () => {
  function responsivelyResize() {
    const gameId = document.getElementById("game");
    gameId.style.width = "80%";
    gameId.style.height = "80%";
  }

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

  function update() {
    responsivelyResize();
  }

  useEffect(() => {
    const canvas = document.getElementById("game");
    console.log(`Canvas name: ${canvas} ${canvas.innerHTML}`);
    const config = {
      width: 1600,
      height: 900,
      type: Phaser.CANVAS,
      canvas,
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
          settings.canvas.style.width = "100%";
          settings.canvas.style.height = "100%";
        },
      },
    };
    const game = new Phaser.Game(config);
  }, []);

  return (
    <div className="Game-container">
      <canvas id="game" />
    </div>
  );
};

export default Game;
