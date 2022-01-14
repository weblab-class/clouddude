import React, { useEffect } from "react";
import Phaser from "phaser";
import "./Game.css";

const Game = ({ editLevel, currentTool, levelData }) => {
  // Global configuration constants
  let movementControls;
  let player;

  function responsivelyResize() {
    const gameId = document.getElementById("game");
    gameId.style.width = "100%";
    gameId.style.height = "100%";
  }

  function preload() {
    // Loads Assets
    this.load.setBaseURL("https://www.dl.dropboxusercontent.com/s/");
    this.load.image("background", "gskpd4bi27lzg1t/waterfall.png?dl=0");
    this.load.image("grass", "8430hxmrkdolsuo/grass.png?dl=0");
    this.load.image("spike", "ktzdki013ci8izz/spikes.png?dl=0");
    this.load.spritesheet("coin", "lka0ez1lu8ui3dd/coin.png?dl=0", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("player", "ube5tzlgdeawxk9/pinkguy.png?dl=0", {
      frameWidth: 32,
      frameHeight: 48,
    });

    // Use the below for adding local files:
    // import test from "../../../dist/images/Block_Blue.png";
    // this.textures.addBase64("test", test);
    //
    // For adding spritesheets or audiosprites:
    // https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3/
  }

  function create() {
    // Create background
    this.add.image(800, 450, "background");

    // Create Player
    player = this.physics.add.sprite(100, 450, "player");

    // Initialize keyboard control
    movementControls = this.input.keyboard.createCursorKeys();

    // Initialize Player Animations
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Create platforms
    const fakePlatformData = [
      { x: 25, y: 875 },
      { x: 75, y: 875 },
      { x: 125, y: 875 },
      { x: 175, y: 875 },
      { x: 225, y: 875 },
      { x: 275, y: 875 },
      { x: 1275, y: 875 },
      { x: 1225, y: 875 },
      { x: 1575, y: 875 },
      { x: 1525, y: 875 },
      { x: 1475, y: 875 },
      { x: 1425, y: 875 },
      { x: 1375, y: 875 },
      { x: 1325, y: 875 },
      { x: 1275, y: 875 },
      { x: 1225, y: 875 },
    ];

    const platforms = this.physics.add.staticGroup();
    for (const platform of fakePlatformData) {
      platforms.create(platform.x, platform.y, "grass");
    }

    // Handle collisions
    this.physics.add.collider(player, platforms);
  }

  function update() {
    // Responsively updates screen size
    responsivelyResize();

    // Handles Keyboard Input

    if (movementControls.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (movementControls.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (movementControls.up.isDown && player.body.touching.down) {
      player.setVelocityY(-300);
    }
  }

  useEffect(() => {
    const canvas = document.getElementById("game");
    // canvas.addEventListener("click", editLevel);
    const config = {
      width: 1600,
      height: 900,
      type: Phaser.CANVAS,
      canvas,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 600 },
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

  // Update click listener for current tool
  useEffect(() => {
    const canvas = document.getElementById("game");
    canvas.addEventListener("click", editLevel);
    return () => {
      canvas.removeEventListener("click", editLevel);
    };
  }, [currentTool, editLevel]);

  return (
    <div className="Game-container">
      <canvas id="game" />
    </div>
  );
};

export default Game;
