import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import Game from "../modules/Game";

import EditorSidebar from "../modules/EditorSidebar";

import "../../utilities.css";
import "./LevelEditor.css";

const LevelEditor = ({ userState }) => {
  // Maintains tool currently selected in editor
  const [currentTool, setCurrentTool] = useState("none");
  // Initialize empty level
  const [levelData, setLevelData] = useState({
    creator: undefined,
    start: { x: undefined, y: undefined },
    exit: { x: undefined, y: undefined },
    platforms: [],
    coins: [],
    obstacles: [],
    funness: undefined,
    difficulty: undefined,
  });

  /*
  // Update creator on user change
  useEffect(() => {
    get("/api/whoami").then((user) => {
      setLevelData({ ...levelData, creator: user.name });
    });
  }, [userState]);
*/

  // Processes clicks on game Canvas to update
  const editLevel = useCallback(
    (event) => {
      const clickPoint = { x: event.offsetX, y: event.offsetY };
      if (clickPoint.x === undefined || clickPoint.y === undefined) {
        return;
      }
      //const gridPoint = clickPointToGridPoint(clickPoint);
      const gridPoint = { x: 10, y: 10 };
      console.log(clickPoint);
      console.log(currentTool);
      if (currentTool === "start") {
        setLevelData({ ...levelData, start: gridPoint });
      } else if (currentTool === "exit") {
        setLevelData({ ...levelData, exit: gridPoint });
      } else if (currentTool === "platform") {
        setLevelData({ ...levelData, platforms: [...levelData.platforms, gridPoint] });
      }
    },
    [currentTool, levelData]
  );

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
        />
      </div>
      <Game setLevelData={setLevelData} editLevel={editLevel} className="LevelEditor-game" />
    </div>
  );
};

export default LevelEditor;

// Converts clickPoint to location in game's coordinate system
const clickPointToGridPoint = (clickPoint, canvas = 0, puzzle = 0) => {
  const width = canvas.width;
  const height = canvas.height;
  const rowCount = puzzle.rows;
  const columnCount = puzzle.columns;
  const cellWidth = width / columnCount;
  const cellheight = height / rowCount;
  let cellX = -1;
  let cellY = -1;

  // Determine X
  for (let x = 0; x <= columnCount + 1; x++) {
    const canvasX = (x - 1) * cellWidth;
    if (canvasX > clickPoint.x) {
      cellX = x - 1;
      break;
    }
  }

  // Determine Y
  for (let y = 0; y <= rowCount + 1; y++) {
    const canvasY = (y - 1) * cellheight;
    if (canvasY > clickPoint.y) {
      cellY = y - 1;
      break;
    }
  }

  return { row: cellY, column: cellX };
};
