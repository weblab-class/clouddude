import React, { useEffect } from "react";
import Phaser from "phaser";
import test from "../../../dist/images/Block_Blue.png";
import "./Game.css";

const Game = ({ editLevel }) => {
  function responsivelyResize() {
    const gameId = document.getElementById("game");
    //gameId.style.width = "80%";
    //gameId.style.height = "80%";
  }

  function preload() {
    this.load.image("sky", "http://labs.phaser.io/assets/skies/space3.png");
    this.load.image("logo", "http://labs.phaser.io/assets/sprites/phaser3-logo.png");
    this.load.image("red", "http://labs.phaser.io/assets/particles/red.png");

    //Harry, here is the simplest way to load assets
    //For adding spritesheets or audiosprites:
    //https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3/
    this.textures.addBase64("test", test);
  }

  function create() {
    this.add.image(400, 300, "sky");
    this.add.image(400, 300, "test");

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
    //canvas.addEventListener("click", editLevel);
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
      <canvas onClick={editLevel} id="game" />
    </div>
  );
};

export default Game;
