import React, { useState, useEffect } from "react";
import LevelData from "./LevelData";
import EditTool from "./EditTool";

import "../../utilities.css";
import "./EditorSidebar.css";

const EditorSidebar = ({ setCurrentTool, currentTool, hoverTag }) => {
  const fakeLevelData = {
    start: { x: 27, y: 27 },
    exit: { x: 27, y: 27 },
    platforms: [
      { image: "img1", x: 27, y: 27 },
      { image: "img2", x: 27, y: 27 },
    ],
    decoration: [{ frame: 27, x: 27, y: 27 }],
    coins: [{ x: 27, y: 27 }],
    obstacles: [
      { type: "something", x: 27, y: 27 },
      { type: "something", x: 27, y: 27 },
    ],
  };

  useEffect(() => {
    console.log(currentTool);
  }, [currentTool]);

  return (
    <div className="EditorSidebar-container">
      <div className="EditorSidebar-tools">
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="name1" img="" />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="name2" img="" />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="name3" img="" />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="name4" img="" />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="name5" img="" />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="name6" img="" />
      </div>
      {/* Tries to save a level after collecting info like name/difficulty with other data props */}
      <LevelData
        className="EditorSidebar-LevelData"
        start={fakeLevelData.start}
        exit={fakeLevelData.exit}
        platforms={fakeLevelData.platforms}
        decoration={fakeLevelData.decoration}
        obstacles={fakeLevelData.obstacles}
        coins={fakeLevelData.coins}
      />
    </div>
  );
};

export default EditorSidebar;
