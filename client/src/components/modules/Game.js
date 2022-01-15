import React, { useCallback, useEffect, useState } from "react";
import Phaser, { NONE } from "phaser";
import "./Game.css";

const Game = ({ editLevel, currentTool, activeLevel, isEditing }) => {
  const [gridPoint, setGridPoint] = useState({ x: undefined, y: undefined });

  // Global configuration constants
  const gameWon = false;
  let isOver = false;

  // Global control variables
  let game;
  let movementControls;
  let player;

  let gameOverText;
  let gameOverCaption;
  let restartKey;

  const sampleData = {
    start: { x: 100, y: 450 },
    exit: { x: 1525, y: 825 },
    platforms: [
      { type: "grass", x: 25, y: 875 },
      { type: "grass", x: 75, y: 875 },
      { type: "grass", x: 175, y: 875 },
      { type: "grass", x: 125, y: 875 },
      { type: "grass", x: 225, y: 875 },
      { type: "grass", x: 275, y: 875 },
      { type: "grass", x: 325, y: 875 },
      { type: "grass", x: 375, y: 875 },
      { type: "grass", x: 425, y: 875 },
      { type: "grass", x: 1275, y: 875 },
      { type: "grass", x: 1225, y: 875 },
      { type: "grass", x: 1575, y: 875 },
      { type: "grass", x: 1525, y: 875 },
      { type: "grass", x: 1475, y: 875 },
      { type: "grass", x: 1425, y: 875 },
      { type: "grass", x: 1375, y: 875 },
      { type: "grass", x: 1325, y: 875 },
      { type: "grass", x: 1275, y: 875 },
      { type: "grass", x: 1225, y: 875 },
    ],
    coins: [
      { type: "spinCoin", x: 175, y: 825 },
      { type: "spinCoin", x: 225, y: 825 },
    ],
    obstacles: [{ type: "spike", x: 275, y: 825 }],
  };

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
    game = new Phaser.Game(config);
  }, []);

  function preload() {
    // Loads Assets
    this.load.setBaseURL("https://www.dl.dropboxusercontent.com/s/");
    this.load.image("background", "gskpd4bi27lzg1t/waterfall.png?dl=0");
    this.load.image("backgroundGrid", "uon4lq9g70ygcf7/waterfallGrid.png?dl=0");
    this.load.image("grass", "8430hxmrkdolsuo/grass.png?dl=0");
    this.load.image("spike", "7a8tzts1xzvl4v3/spikes.png?dl=0");
    this.load.image("grid", "hidf43mavg0i8xt/gridSquare.png?dl=0");
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
    if (isEditing) {
      this.add.image(800, 450, "backgroundGrid");
    } else {
      this.add.image(800, 450, "background");
    }

    // Create Player
    player = this.physics.add.sprite(100, 450, "player");

    // Initialize keyboard control
    movementControls = this.input.keyboard.createCursorKeys();
    restartKey = this.input.keyboard.addKey("R");
    restartKey.on("down", () => {
      this.scene.restart();
      isOver = false;
    });

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

    // Initialize Coin Animation
    this.anims.create({
      key: "spin",
      frames: this.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 7,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });

    // Create platforms
    const platforms = this.physics.add.staticGroup();

    for (const platform of sampleData.platforms) {
      if (platform.type === "grass") {
        platforms.create(platform.x, platform.y, "grass");
      }
    }

    // Create coins
    const coins = this.add.group();

    for (const coin of sampleData.coins) {
      if (coin.type === "spinCoin") {
        const newCoin = this.physics.add.sprite(coin.x, coin.y, "coin");
        newCoin.anims.play("spin");
        newCoin.setImmovable(true);
        newCoin.body.setAllowGravity(false);
        coins.add(newCoin);
      }
    }

    // Create obstacles
    const spikes = this.physics.add.staticGroup();

    for (const obstacle of sampleData.obstacles) {
      if (obstacle.type === "spike") {
        spikes.create(obstacle.x, obstacle.y, "spike");
      }
    }

    // Create Game Over Text
    gameOverText = this.add.text(800, 300, "Level Failed", {
      fontSize: "150px",
      fill: "#00ff00",
      strokeThickness: 11,
      shadow: {
        offsetX: 4,
        offsetY: 2,
        fill: false,
        stroke: true,
      },
    });
    gameOverText.setOrigin(0.5, 0.5);
    gameOverText.visible = false;

    // Create restart caption
    gameOverCaption = this.add.text(800, 420, "Press 'r' to Restart", {
      fontSize: "70px",
      fill: "#00ff00",
      strokeThickness: 8,
      shadow: {
        offsetX: 4,
        offsetY: 2,
        fill: false,
        stroke: true,
      },
    });
    gameOverCaption.setOrigin(0.5, 0.5);
    gameOverCaption.visible = false;

    // Create Level editor grid
    if (isEditing) {
      const grid = this.add.group();

      grid.createMultiple({
        key: "grid",
        name: "grid",
        frameQuantity: 576,
        hitArea: new Phaser.Geom.Rectangle(1, 1, 49, 49),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      });

      Phaser.Actions.GridAlign(grid.getChildren(), {
        width: 32,
        height: 18,
        cellWidth: 50,
        cellHeight: 50,
        x: 25,
        y: 25,
      });
    }

    this.input.on("gameobjectdown", clickCallback);

    // Handle platform collisions
    this.physics.add.collider(player, platforms);

    // Handle spike collisions
    this.physics.add.overlap(
      player,
      spikes,
      function (player, spike) {
        isOver = true;
        player.setTintFill(0xff0000);
        this.tweens.add({
          targets: player,
          y: player.y - 100,
          angle: -90,
          alpha: 0,
          duration: 1000,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete() {
            gameOver();
          },
        });
      },
      null,
      this
    );

    // Handle coin collection
    this.physics.add.overlap(
      player,
      coins,
      function (player, coin) {
        this.tweens.add({
          targets: coin,
          y: coin.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete() {
            coins.killAndHide(coin);
            coins.remove(coin);
          },
        });
      },
      null,
      this
    );
  }

  const clickCallback = (pointer, gameObject) => {
    setGridPoint({ x: gameObject.x, y: gameObject.y });
  };

  useEffect(() => {
    editLevel(gridPoint);
  }, [gridPoint]);

  function update() {
    // Responsively updates screen size
    responsivelyResize();

    // Handles Keyboard Input

    if (movementControls.left.isDown && !isOver) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (movementControls.right.isDown && !isOver) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (movementControls.up.isDown && player.body.touching.down && !isOver) {
      player.setVelocityY(-300);
    }
  }

  function responsivelyResize() {
    // Resize game to fit available space
    const gameId = document.getElementById("game");
    gameId.style.width = "100%";
    gameId.style.height = "100%";
  }

  function gameOver() {
    isOver = true;
    player.setActive(false).setVisible(false);
    if (gameWon === true) {
      // Do stuff
    } else {
      gameOverText.visible = true;
      gameOverCaption.visible = true;
    }
  }

  /*
  // Update click listener for current tool
  useEffect(() => {
    console.log(test);
    savedInput.on("gameobjectdown", clickCallback);
    return () => {
      savedInput.off("gameobjectdown", clickCallback);
    };
  }, [currentTool, editLevel]);
  */

  return (
    <div className="Game-container">
      <canvas id="game" />
    </div>
  );
};

export default Game;
