import React, { useCallback, useEffect, useState } from "react";
import Phaser, { NONE } from "phaser";
import Key from "./keyboard";
import "./Game.css";
import { post } from "../../utilities";

const Game = ({
  editLevel,
  currentTool,
  activeLevel,
  isEditing,
  levelsWon,
  setLevelsWon,
  userId,
}) => {
  const [gridPoint, setGridPoint] = useState({ x: undefined, y: undefined });
  const [test, setTest] = useState(0);

  // Global configuration constants
  let gameWon = false;
  let isOver = false;

  // Global control variables
  let game;
  let movementControls;
  let player;
  let door;
  let config;
  let resizeTimeout;

  let gameOverText;
  let gameOverCaption;
  let gameWonText;
  let gameWonCaption;
  let restartKey;

  // Establish timeout promise
  function later(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  // Handle level data gathering
  const getCurrentTool = () => {
    return document.getElementById("currentToolHolder").value;
  };

  const getActiveLevel = () => {
    return document.getElementById("currentLevelHolder").value;
  };

  useEffect(() => {
    document.getElementById("currentToolHolder").value = currentTool;
  }, [currentTool]);

  useEffect(() => {
    document.getElementById("currentLevelHolder").value = activeLevel;
  }, [activeLevel]);

  // Setup game
  useEffect(() => {
    reloadGame();
  }, [test]);

  function reloadGame() {
    // If game is already created, restart it
    if (game) {
      game.destroy();
      const canvas = document.getElementsByTagName("canvas");
      canvas[0].remove();
    }
    // Creates new game
    const container = document.getElementById("game-container");
    const canvas = document.getElementById("game");
    const config = {
      width: 1600,
      height: 900,
      type: Phaser.WEBGL,
      parent: container,
      autoFocus: true,
      input: {
        keyboard: {
          capture: [37, 38, 39, 40],
        },
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 600 },
          debug: true,
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
  }

  function preload() {
    // Loads Assets
    this.load.setBaseURL("https://www.dl.dropboxusercontent.com/s/");
    this.load.image("background", "gskpd4bi27lzg1t/waterfall.png?dl=0");
    this.load.image("backgroundGrid", "uon4lq9g70ygcf7/waterfallGrid.png?dl=0");
    this.load.image("grass", "8430hxmrkdolsuo/grass.png?dl=0");
    this.load.image("spike", "7a8tzts1xzvl4v3/spikes.png?dl=0");
    this.load.image("grid", "hidf43mavg0i8xt/gridSquare.png?dl=0");
    this.load.image("falling", "4m7buvvtqk7z4ks/Falling.png?dl=0");
    this.load.spritesheet("coin", "lka0ez1lu8ui3dd/coin.png?dl=0", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("door", "54mjlshl2ibwxp0/door.png?dl=0", {
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

    // Create player
    player = this.physics.add.sprite(getActiveLevel().start.x, getActiveLevel().start.y, "player");

    // Initialize player animations
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

    // Initialize coin animation
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

    // Create door
    door = this.physics.add.sprite(getActiveLevel().exit.x, getActiveLevel().exit.y, "door");
    door.setImmovable(true);
    door.body.setAllowGravity(false);

    // Create platforms
    const platforms = this.physics.add.staticGroup();
    const falling = this.physics.add.staticGroup();

    for (const platform of getActiveLevel().platforms) {
      if (platform.type === "grass") {
        platforms.create(platform.x, platform.y, "grass");
      }
      if (platform.type === "falling") {
        falling.create(platform.x, platform.y, "falling");
      }
    }

    // Create coins
    const coins = this.add.group();

    for (const coin of getActiveLevel().coins) {
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

    for (const obstacle of getActiveLevel().obstacles) {
      if (obstacle.type === "spike") {
        const spike = spikes.create(obstacle.x, obstacle.y, "spike");
        spike.setScale(1.0, 0.75);
        spike.y += 6.25;
        spike.refreshBody();
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

    // Create Game Won Text
    gameWonText = this.add.text(800, 300, "Level Won", {
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
    gameWonText.setOrigin(0.5, 0.5);
    gameWonText.visible = false;

    // Create restart caption
    gameWonCaption = this.add.text(800, 420, "Press 'r' to Restart", {
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
    gameWonCaption.setOrigin(0.5, 0.5);
    gameWonCaption.visible = false;

    // Create Level editor grid
    if (isEditing) {
      const grid = this.add.group();

      grid.createMultiple({
        key: "grid",
        name: "grid",
        frameQuantity: 576,
      });

      Phaser.Actions.GridAlign(grid.getChildren(), {
        width: 32,
        height: 18,
        cellWidth: 50,
        cellHeight: 50,
        x: 25,
        y: 25,
      });

      Phaser.Actions.SetHitArea(grid.getChildren());
      this.input.on("gameobjectdown", (pointer, gameObject) => {
        setGridPoint({ x: gameObject.x, y: gameObject.y });
        setTimeout(() => {
          this.scene.restart();
          isOver = false;
          gameWon = false;
        }, 15);
      });

      /*
      grid.getChildren().forEach((element) => {
        element.setInteractive();
        //element.on("pointerdown", this.onLevelIconDown.bind(this, element));
      */
    }

    // Enables responsive resizing
    window.onresize = function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Reload game on resize
        reloadGame();
      }, 100);
      later(2000).then(() => {
        this.scene.restart();
      });
    };

    // Handle platform collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(
      player,
      falling,
      function (player, fallingCollider) {
        later(300).then(() => {
          fallingCollider.body.enable = false;
          this.tweens.add({
            targets: fallingCollider,
            y: fallingCollider.y + 100,
            alpha: 0,
            duration: 1300,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete() {
              falling.killAndHide(fallingCollider);
              falling.remove(fallingCollider);
            },
          });
        });
      },
      null,
      this
    );

    // Handle door collisions
    this.physics.add.overlap(player, door, (playerCollider, doorCollider) => {
      doorCollider.setFrame(1);
      gameWon = true;
      gameOver();
    });

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
          duration: 800,
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
    if (isEditing) {
      editLevel(gridPoint);
    }
  }, [gridPoint]);

  function update() {
    // Responsively updates screen size
    responsivelyResize();

    // Handles Keyboard Input

    if (Key.isDown(Key.LEFT) && !isOver) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (Key.isDown(Key.RIGHT) && !isOver) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (Key.isDown(Key.UP) && player.body.blocked.down && !isOver) {
      player.setVelocityY(-300);
    }

    if (Key.isDown(Key.R)) {
      this.scene.restart();
      isOver = false;
    }

    if (player.y > 900) {
      gameOver();
    }
  }

  function responsivelyResize() {
    // Resize game to fit available space
    // const gameId = document.getElementById("game-container");
    // gameId.style.width = "100%";
    // gameId.style.height = "100%";
  }

  function gameOver() {
    isOver = true;
    player.setActive(false).setVisible(false);
    if (gameWon === true) {
      console.log("winer");
      gameWonText.visible = true;
      gameWonCaption.visible = true;

      if (!isEditing) {
        const body = { user: { levelsWon, _id: userId } };
        post("/api/profile", body).then((user) => {
          setLevelsWon(user.levelsWon);
        });
      }
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
    <div>
      <div id="game-container" className="Game-container" />
      <div id="currentToolHolder" value={currentTool} />
      <div id="currentLevelHolder" value={activeLevel} />
    </div>
  );
};

export default Game;
