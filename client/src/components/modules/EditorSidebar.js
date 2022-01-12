import React, { useState, useEffect } from "react";
import LevelData from "../modules/LevelData";
import Form from "react-bootstrap/Form";

import "../../utilities.css";
import "./EditorSidebar.css";

const EditorSidebar = () => {
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

  return (
    <div className="EditorSidebar-container">
      Tool Containers here
      {/* Tries to save a level after collecting info like name/difficulty with other data props */}
      <LevelData
        className="LevelEditor-LevelData"
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
