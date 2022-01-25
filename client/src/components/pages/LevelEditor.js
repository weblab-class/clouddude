import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import Game from "../modules/Game";
import { get } from "../../utilities";

import EditorSidebar from "../modules/EditorSidebar";

import "../../utilities.css";
import "./LevelEditor.css";

const LevelEditor = ({
  userState,
  publishedLevels,
  setPublishedLevels,
  userId,
  setActiveLevel,
}) => {
  // Maintains tool currently selected in editor
  const [currentTool, setCurrentTool] = useState("none");

  // Maintains gravity of

  // String to communicate messages to user
  const [message, setMessage] = useState("Design Your Level!");

  // Initialize empty level
  const [levelData, setLevelData] = useState({
    creator: undefined,
    name: "",
    description: "",
    start: { x: 25, y: 25 },
    exit: { x: 1575, y: 875 },
    platforms: [],
    coins: [],
    obstacles: [],
    gravity: { x: 0, y: 600 },
    funness: 0,
    difficulty: 0,
    numRatings: 0,
  });

  // Update creator on user change
  useEffect(() => {
    get("/api/whoami").then((user) => {
      setLevelData({ ...levelData, creator: user.name });
    });
  }, [userState]);

  // Update message on tool switch
  useEffect(() => {
    if (message !== "Design Your Level!") {
      setMessage("Design Your Level!");
    }
  }, [currentTool]);

  // Updates level based on Canvas click
  const editLevel = useCallback(
    (gridPoint) => {
      console.log(gridPoint);
      console.log(currentTool);

      // Resets message
      if (message !== "Design Your Level!") {
        setMessage("Design Your Level!");
      }

      // Skips if gridpoint is undefined
      if (gridPoint.x === undefined || gridPoint.y === undefined) {
        return;
      }

      // Checks if something is already in grid square
      let spotContainsItem = false;
      let objectInSpot;
      let indexOfSpot;

      for (let i = 0; i < levelData.platforms.length; i++) {
        const platformToCheck = levelData.platforms[i];
        if (platformToCheck.x === gridPoint.x && platformToCheck.y === gridPoint.y) {
          spotContainsItem = true;
          objectInSpot = "platform";
          indexOfSpot = i;
        }
      }

      for (let i = 0; i < levelData.coins.length; i++) {
        const platformToCheck = levelData.coins[i];
        if (platformToCheck.x === gridPoint.x && platformToCheck.y === gridPoint.y) {
          spotContainsItem = true;
          objectInSpot = "coin";
          indexOfSpot = i;
        }
      }

      for (let i = 0; i < levelData.obstacles.length; i++) {
        const platformToCheck = levelData.obstacles[i];
        if (platformToCheck.x === gridPoint.x && platformToCheck.y === gridPoint.y) {
          spotContainsItem = true;
          objectInSpot = "obstacle";
          indexOfSpot = i;
        }
      }

      // Applies tool to grid square
      if (currentTool === "start") {
        setLevelData({ ...levelData, start: gridPoint });
      } else if (currentTool === "exit") {
        setLevelData({ ...levelData, exit: gridPoint });
      } else if (currentTool === "platform" && !objectInSpot) {
        setLevelData({
          ...levelData,
          platforms: [...levelData.platforms, { ...gridPoint, type: "grass" }],
        });
      } else if (currentTool === "coin" && !objectInSpot) {
        setLevelData({
          ...levelData,
          coins: [...levelData.coins, { ...gridPoint, type: "spinCoin" }],
        });
      } else if (currentTool === "spike" && !objectInSpot) {
        setLevelData({
          ...levelData,
          obstacles: [...levelData.obstacles, { ...gridPoint, type: "spike" }],
        });
      } else if (currentTool === "falling" && !objectInSpot) {
        setLevelData({
          ...levelData,
          platforms: [...levelData.platforms, { ...gridPoint, type: "falling" }],
        });
      } else if (currentTool === "spinner" && !objectInSpot) {
        setLevelData({
          ...levelData,
          obstacles: [...levelData.obstacles, { ...gridPoint, type: "spinner" }],
        });
      } else if (currentTool === "spider" && !objectInSpot) {
        setLevelData({
          ...levelData,
          obstacles: [...levelData.obstacles, { ...gridPoint, type: "spider" }],
        });
      } else if (currentTool === "worm" && !objectInSpot) {
        setLevelData({
          ...levelData,
          obstacles: [...levelData.obstacles, { ...gridPoint, type: "worm" }],
        });
      } else if (currentTool === "lock" && !objectInSpot) {
        setLevelData({
          ...levelData,
          platforms: [...levelData.platforms, { ...gridPoint, type: "lock" }],
        });
      } else if (currentTool === "key" && !objectInSpot) {
        setLevelData({
          ...levelData,
          coins: [...levelData.coins, { ...gridPoint, type: "key" }],
        });
      } else if (currentTool === "delete") {
        const levelDataCopy = { ...levelData };

        if (objectInSpot === "platform") {
          levelDataCopy.platforms.splice(indexOfSpot, 1);
        } else if (objectInSpot === "coin") {
          levelDataCopy.coins.splice(indexOfSpot, 1);
        } else if (objectInSpot === "obstacle") {
          levelDataCopy.obstacles.splice(indexOfSpot, 1);
        }

        setLevelData(levelDataCopy);
      }
    },
    [currentTool, levelData, message]
  );
  document.body.style.overflow = "hidden";
  return (
    <div className="LevelEditor-container">
      <Helmet>
        <title>Level Designer</title>
      </Helmet>

      <div className="LevelEditor-sidebar">
        <EditorSidebar
          currentTool={currentTool}
          className="LevelEditor-sidebar"
          setCurrentTool={setCurrentTool}
          levelData={levelData}
          setLevelData={setLevelData}
          message={message}
          setMessage={setMessage}
          publishedLevels={publishedLevels}
          setPublishedLevels={setPublishedLevels}
          setActiveLevel={setActiveLevel}
          userId={userId}
        />
      </div>
      <Game
        message={message}
        setMessage={setMessage}
        setLevelData={setLevelData}
        editLevel={editLevel}
        currentTool={currentTool}
        levelData={levelData}
        isEditing
        activeLevel={levelData}
        className="LevelEditor-game"
      />
    </div>
  );
};

export default LevelEditor;
