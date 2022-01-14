import React, { useState, useEffect } from "react";
import LevelData from "./LevelData";
import EditTool from "./EditTool";

import "../../utilities.css";
import "./EditorSidebar.css";

const EditorSidebar = ({ setCurrentTool, currentTool, levelData }) => {
  return (
    <div className="EditorSidebar-container">
      {console.log(currentTool)}
      {console.log(levelData)}
      <div className="EditorSidebar-tools">
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="start" img="" />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="exit" img="" />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="platform"
          img=""
        />
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
