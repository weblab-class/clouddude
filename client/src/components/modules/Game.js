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
  setLevelsPlayed,
  levelsPlayed,
  userId,
}) => {
  const [gridPoint, setGridPoint] = useState({ x: undefined, y: undefined });
  const [test, setTest] = useState(0);
  const [updateLevelsWon, setUpdateLevelsWon] = useState(false);

  // Global configuration constants
  let gameWon = false;
  let isOver = false;
  let jumpFlag = true;

  // Global control variables
  let game;
  let movementControls;
  let player;
  let spinners;
  let spiders;
  let worms;
  let fireballs;
  let door;
  let config;
  let resizeTimeout;
  let jump;
  let timer;

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
    if (document.getElementById("currentToolHolder") !== undefined) {
      return document.getElementById("currentToolHolder").value;
    }
    return undefined;
  };

  const getActiveLevel = () => {
    if (document.getElementById("currentLevelHolder") !== undefined) {
      return document.getElementById("currentLevelHolder").value;
    }
    return undefined;
  };

  useEffect(() => {
    if (document.getElementById("currentToolHolder") !== undefined) {
      document.getElementById("currentToolHolder").value = currentTool;
    }
  }, [currentTool]);

  useEffect(() => {
    if (document.getElementById("currentLevelHolder") !== undefined) {
      document.getElementById("currentLevelHolder").value = activeLevel;
    }
  }, [activeLevel]);

  // Setup game
  useEffect(() => {
    reloadGame();
  }, [test]);

  // increment levels played
  useEffect(() => {
    const body = { user: { levelsPlayed, _id: userId } };
    post("/api/profile", body).then((user) => {
      setLevelsPlayed(user.levelsPlayed);
    });
  }, []);

  // increment levels won
  useEffect(() => {
    if (updateLevelsWon) {
      const body = { user: { levelsWon, _id: userId } };
      post("/api/profile", body).then((user) => {
        setLevelsWon(user.levelsWon);
      });
    }
  }, [updateLevelsWon]);

  function reloadGame() {
    // If game is already created, restart it
    if (game) {
      game.destroy();
      const canvas = document.getElementsByTagName("canvas");
      if (canvas[0] !== undefined) {
        canvas[0].remove();
      }
    }
    // Creates new game
    gameWon = false;
    isOver = false;
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
          debug: false,
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
    this.load.image("lock", "hchmqqeq35o0hlk/lock.png?dl=0");
    this.load.image("key", "a9t5307kthiyhli/smallKey.png?dl=0");

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
    this.load.spritesheet("spinner", "89fxf5er8yycdoi/spinner.png?dl=0", {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet("spider", "ygw0v8x3lqa9s7v/spider.png?dl=0", {
      frameWidth: 46,
      frameHeight: 34,
    });
    this.load.spritesheet("worm", "7z3nau7x9glwkpv/worm.png?dl=0", {
      frameWidth: 18,
      frameHeight: 50,
    });
    this.load.spritesheet("fireball", "ga1ure11kqhx4l8/fireballTiny.png?dl=0", {
      frameWidth: 25,
      frameHeight: 25,
    });

    this.load.audio("jump", "7oi01wjujjamkry/jump.wav?raw=1");
    this.load.audio("coin", "maqua4unxcmsc3b/coin.wav?raw=1");
    this.load.audio("damage", "paeeehazuv0jun8/stomp.wav?raw=1");
    this.load.audio("key", "hpw3u6n0bgw939b/key.wav?raw=1");
    this.load.audio("unlock", "j0mhvm09of2wi4n/unlock.wav?raw=1");
    this.load.audio("fireball", "lqam1knjy6rlo7m/fireball.mp3?raw=1");

    // Use the below for adding local files:
    // import test from "../../../dist/images/Block_Blue.png";
    // this.textures.addBase64("test", test);
    //
    // For adding spritesheets or audiosprites:
    // https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3/
  }

  function create() {
    // Create restart function
    const restart = () => {
      this.scene.restart();
    };

    // Create background
    if (isEditing) {
      this.add.image(800, 450, "backgroundGrid");
    } else {
      this.add.image(800, 450, "background");
    }

    // Set world gravity
    this.physics.world.gravity.x = getActiveLevel().gravity.x;
    this.physics.world.gravity.y = getActiveLevel().gravity.y;

    // Create player
    player = this.physics.add.sprite(getActiveLevel().start.x, getActiveLevel().start.y, "player");
    player.body.setSize(20, 40, 8, 8);

    // Initialize jump audio
    jump = this.sound.add("jump");

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

    // Initialzie spinner amnimations
    this.anims.create({
      key: "spinnerRoll",
      frames: this.anims.generateFrameNumbers("spinner", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    // Initialize spider animations
    this.anims.create({
      key: "spiderWalk",
      frames: this.anims.generateFrameNumbers("spider", { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "spiderDie",
      frames: this.anims.generateFrameNumbers("spider", {
        frames: [0, 4, 0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3],
      }),
      frameRate: 12,
      repeat: 0,
    });

    // Initialize worm animation
    this.anims.create({
      key: "wormWiggle",
      frames: this.anims.generateFrameNumbers("worm", { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "wormDie",
      frames: this.anims.generateFrameNumbers("worm", {
        frames: [0, 3, 0, 3, 0, 3, 0, 2],
      }),
      frameRate: 12,
      repeat: 0,
    });

    this.anims.create({
      key: "fire",
      frames: this.anims.generateFrameNumbers("fireball", { start: 0, end: 3 }),
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
    const locks = this.add.group();

    for (const platform of getActiveLevel().platforms) {
      if (platform.type === "grass") {
        platforms.create(platform.x, platform.y, "grass");
      } else if (platform.type === "falling") {
        falling.create(platform.x, platform.y, "falling");
      } else if (platform.type === "lock") {
        const newLock = this.physics.add.sprite(platform.x, platform.y, "lock");
        newLock.setImmovable(true);
        newLock.body.setAllowGravity(false);
        locks.add(newLock, true);
      }
    }

    // Create coins
    const coins = this.add.group();
    const keys = this.add.group();

    for (const coin of getActiveLevel().coins) {
      if (coin.type === "spinCoin") {
        const newCoin = this.physics.add.sprite(coin.x, coin.y, "coin");
        newCoin.anims.play("spin");
        newCoin.setImmovable(true);
        newCoin.body.setAllowGravity(false);
        newCoin.body.setCircle(20, 5, 5);
        coins.add(newCoin);
      } else if (coin.type === "key") {
        const newKey = this.physics.add.sprite(coin.x, coin.y, "key");
        newKey.setImmovable(true);
        newKey.body.setAllowGravity(false);
        keys.add(newKey);
      }
    }

    // Create obstacles
    const spikes = this.physics.add.staticGroup();
    spinners = this.add.group();
    spiders = this.add.group();
    worms = this.add.group();
    fireballs = this.add.group();

    for (const obstacle of getActiveLevel().obstacles) {
      if (obstacle.type === "spike") {
        const spike = spikes.create(obstacle.x, obstacle.y, "spike");
        spike.setScale(1.0, 0.75);
        spike.y += 6.25;
        spike.refreshBody();
      } else if (obstacle.type === "spinner") {
        const spinner = this.physics.add.sprite(obstacle.x, obstacle.y, "spinner");
        spinner.body.allowGravity = false;
        spinner.body.setCircle(23, 1, 2);
        spinner.setVelocityX(100);
        spinner.anims.play("spinnerRoll", true);
        spinners.add(spinner);
      } else if (obstacle.type === "spider") {
        const spider = this.physics.add.sprite(obstacle.x, obstacle.y, "spider");
        spider.setScale(0.8, 0.9);
        spider.setVelocityX(100);
        spider.anims.play("spiderWalk");
        spiders.add(spider);
      } else if (obstacle.type === "worm") {
        const worm = this.physics.add.sprite(obstacle.x, obstacle.y, "worm");
        worm.anims.play("wormWiggle");
        worm.body.setMass(9000);
        worms.add(worm);
      }
    }

    // Handles worm control
    const fireWorms = () => {
      Phaser.Actions.Call(worms.getChildren(), (worm) => {
        if (
          Phaser.Math.Distance.Between(player.x, player.y, worm.x, worm.y) < 600 &&
          worm.body.enable
        ) {
          const fireball = this.physics.add.sprite(worm.x, worm.y, "fireball");
          fireballs.add(fireball);
          fireball.anims.play("fire");
          this.sound.play("fireball");
          fireball.body.setAllowGravity(false);
          fireball.body.setCircle(10, 4, 4);
          this.physics.moveToObject(fireball, player, 400);
          later(5000).then((fireball) => {
            if (fireball) {
              fireballs.killAndHide(fireball);
              fireballs.remove(fireball);
            }
          });
        }
      });
    };

    this.triggerTimer = this.time.addEvent({
      callback: fireWorms,
      callbackScope: this,
      delay: 1500, // 1000 = 1 second
      loop: true,
    });

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

      // Enables drag editing
      this.input.on("gameobjectover", (pointer, currentlyOver) => {
        if (Key.isDown(Key.MOUSE)) {
          setGridPoint({ x: currentlyOver.x, y: currentlyOver.y });
          setTimeout(() => {
            this.scene.restart();
            isOver = false;
            gameWon = false;
          }, 15);
        }
      });

      /*
      grid.getChildren().forEach((element) => {
        element.setInteractive();
        //element.on("pointerdown", this.onLevelIconDown.bind(this, element));
      */
    }

    // Enables responsive resizing
    window.onresize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Reload game on resize
        reloadGame();
        restart();

        later(200).then(() => {
          setTimeout(() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", {
                key: "r",
                keyCode: 82,
                bubbles: true,
              })
            );
          }, 15);
          setTimeout(() => {
            document.dispatchEvent(
              new KeyboardEvent("keyup", {
                key: "r",
                keyCode: 82,
                bubbles: true,
              })
            );
          }, 50);
        });
      }, 100);
    };

    window.onscroll = function () {
      console.log("scroll 1");
    };

    window.onscroll = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Reload game on resize
        reloadGame();
        restart();

        later(200).then(() => {
          setTimeout(() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", {
                key: "r",
                keyCode: 82,
                bubbles: true,
              })
            );
          }, 15);
          setTimeout(() => {
            document.dispatchEvent(
              new KeyboardEvent("keyup", {
                key: "r",
                keyCode: 82,
                bubbles: true,
              })
            );
          }, 50);
        });
      }, 100);
    };

    // Handle platform collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, locks);
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

    this.physics.add.collider(spiders, platforms);
    this.physics.add.collider(spiders, locks);
    this.physics.add.collider(
      spiders,
      falling,
      function (spiders, fallingCollider) {
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

    this.physics.add.collider(spinners, platforms);
    this.physics.add.collider(spinners, locks);
    this.physics.add.collider(spinners, spinners);
    this.physics.add.collider(
      spinners,
      falling,
      function (spinner, fallingCollider) {
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

    this.physics.add.collider(worms, platforms);
    this.physics.add.collider(worms, locks);
    this.physics.add.collider(
      worms,
      falling,
      function (worm, fallingCollider) {
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

    const fireballCollision = (fireball, object) => {
      fireball.body.enable = false;
      this.tweens.add({
        targets: fireball,
        alpha: 0,
        duration: 500,
        ease: "Cubic.easeOut",
        callbackScope: this,
        onComplete() {
          fireballs.killAndHide(fireball);
          fireballs.remove(fireball);
        },
      });
    };

    this.physics.add.collider(fireballs, platforms, fireballCollision, null, this);
    this.physics.add.collider(fireballs, locks, fireballCollision, null, this);
    this.physics.add.collider(fireballs, falling, fireballCollision, null, this);
    this.physics.add.collider(fireballs, spikes, fireballCollision, null, this);
    this.physics.add.collider(fireballs, spinners, fireballCollision, null, this);

    // Handle key collisions
    this.physics.add.overlap(
      player,
      keys,
      function (player, key) {
        key.disableBody(false, false);
        this.sound.play("key");
        this.tweens.add({
          targets: key,
          y: key.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete() {
            keys.killAndHide(key);
            keys.remove(key);

            let unlockFlag = true;
            Phaser.Actions.Call(keys.getChildren(), (key) => {
              unlockFlag = false;
            });

            if (unlockFlag) {
              this.sound.play("unlock");
              Phaser.Actions.Call(locks.getChildren(), (lock) => {
                lock.disableBody(false, false);
                this.tweens.add({
                  targets: lock,
                  y: lock.y - 100,
                  alpha: 0,
                  duration: 800,
                  ease: "Cubic.easeOut",
                  callbackScope: this,
                  onComplete() {
                    locks.killAndHide(lock);
                  },
                });
              });
            }
          },
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
    this.physics.add.collider(spinners, spikes);
    this.physics.add.overlap(
      player,
      spikes,
      function (player, spike) {
        player.disableBody(false, false);
        this.sound.play("damage");
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
    this.physics.add.collider(
      spiders,
      spikes,
      (spider, spike) => {
        if (spike.body.touching.up && spider.body.touching.down) {
          spider.disableBody(false, false);
          this.sound.play("damage");
          spider.anims.play("spiderDie");
          later(2000).then(() => {
            spiders.killAndHide(spider);
            spiders.remove(spider);
          });
        } else {
          const spiderCurrentVelocity = spider.body.velocity.x;
          spider.setVelocityX(-spiderCurrentVelocity);
        }
      },
      null,
      this
    );

    this.physics.add.collider(
      worms,
      spikes,
      (worm, spike) => {
        worm.disableBody(false, false);
        this.sound.play("damage");
        worm.anims.play("wormDie");
        later(1000).then(() => {
          worms.killAndHide(worm);
          worms.remove(worm);
        });
      },
      null,
      this
    );

    // Handle spinner collisions
    this.physics.add.overlap(
      player,
      spinners,
      function (player, spinner) {
        this.sound.play("damage");
        player.disableBody(false, false);
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
    this.physics.add.overlap(
      spiders,
      spinners,
      (spider, spinner) => {
        this.sound.play("damage");
        spider.disableBody(false, false);
        spider.setVelocityX(0);
        spider.anims.play("spiderDie");
        later(2000).then(() => {
          spiders.killAndHide(spider);
          spiders.remove(spider);
        });
      },
      null,
      this
    );
    this.physics.add.overlap(
      worms,
      spinners,
      (worm, spinner) => {
        this.sound.play("damage");
        worm.disableBody(false, false);
        worm.setVelocityX(0);
        worm.anims.play("wormDie");
        later(1000).then(() => {
          worms.killAndHide(worm);
          worms.remove(worm);
        });
      },
      null,
      this
    );

    // Handles spider collisions
    this.physics.add.collider(
      player,
      spiders,
      function (player, spider) {
        if (spider.body.touching.up) {
          this.sound.play("damage");
          player.setVelocityY(-200);
          spider.disableBody(false, false);
          spider.setVelocityX(0);
          spider.anims.play("spiderDie");
          later(2000).then(() => {
            spiders.killAndHide(spider);
            spiders.remove(spider);
          });
        } else if (isOver === false) {
          this.sound.play("damage");
          isOver = true;
          player.disableBody(false, false);
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
        }
      },
      null,
      this
    );

    // Handles worm collisions
    this.physics.add.collider(
      player,
      worms,
      function (player, worm) {
        if (worm.body.touching.up) {
          this.sound.play("damage");
          player.setVelocityY(-200);
          worm.disableBody(false, false);
          worm.setVelocityX(0);
          worm.anims.play("wormDie");
          later(1000).then(() => {
            worms.killAndHide(worm);
            worms.remove(worm);
          });
        } else if (isOver === false) {
          this.sound.play("damage");
          isOver = true;
          player.disableBody(false, false);
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
        }
      },
      null,
      this
    );

    // Handle coin collection
    this.physics.add.overlap(
      player,
      coins,
      function (player, coin) {
        coin.disableBody(false, false);
        this.sound.play("coin");
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

    // Handle fireball collisons
    this.physics.add.overlap(
      player,
      fireballs,
      function (player, fireball) {
        player.disableBody(false, false);
        fireballCollision(fireball, player);
        this.sound.play("damage");
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

    this.physics.add.overlap(
      spiders,
      fireballs,
      (spider, fireball) => {
        fireballCollision(fireball, spider);
        this.sound.play("damage");
        spider.disableBody(false, false);
        spider.setVelocityX(0);
        spider.anims.play("spiderDie");
        later(2000).then(() => {
          spiders.killAndHide(spider);
          spiders.remove(spider);
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

    if ((Key.isDown(Key.LEFT) || Key.isDown(Key.A)) && !isOver) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if ((Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) && !isOver) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if ((Key.isDown(Key.UP) || Key.isDown(Key.W)) && player.body.blocked.down && !isOver) {
      if (jumpFlag) {
        jump.play();
        jumpFlag = false;
      }
      player.setVelocityY(-300);
    }

    if (!player.body.blocked.down) {
      jumpFlag = true;
    }

    if (Key.isDown(Key.R)) {
      this.scene.restart();
      gameWon = false;
      isOver = false;
    }

    // Handles spinner control
    Phaser.Actions.Call(spinners.getChildren(), (spinner) => {
      if (spinner.body.touching.right) {
        spinner.setVelocityX(-100);
      } else if (spinner.body.touching.left) {
        spinner.setVelocityX(100);
      }
    });

    // Handles spider control
    Phaser.Actions.Call(spiders.getChildren(), (spider) => {
      // Reflects spiders at end of platform
      if (!spider.body.blocked.down && spider.body.velocity.x !== 0) {
        const spiderCurrentVelocity = spider.body.velocity.x;
        spider.setVelocityX(-spiderCurrentVelocity);
      }

      // Reflects spiders on wall impacts
      if (spider.body.touching.right) {
        spider.setVelocityX(-100);
      } else if (spider.body.touching.left) {
        spider.setVelocityX(100);
      }

      // Controls spider direction
      if (spider.body.velocity.x > 0) {
        spider.flipX = true;
      } else if (spider.body.velocity.x < 0) {
        spider.flipX = false;
      }
    });

    // Handles players falling out of the map

    if (player.y > 900 || player.y < -600 || player.x < -500 || player.x > 2100) {
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
      gameWonText.visible = true;
      gameWonCaption.visible = true;
      if (!isEditing) {
        setUpdateLevelsWon(true);
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
    <div id="game-container" className="Game-container">
      <div id="currentToolHolder" value={currentTool} />
      <div id="currentLevelHolder" value={activeLevel} />
    </div>
  );
};

export default Game;
