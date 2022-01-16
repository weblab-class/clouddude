import React, { useState, useEffect } from "react";
import LevelData from "./LevelData";
import EditTool from "./EditTool";

import "../../utilities.css";
import "./EditorSidebar.css";

const EditorSidebar = ({
  setCurrentTool,
  currentTool,
  levelData,
  setLevelData,
  message,
  setMessage,
  publishedLevels,
  setPublishedLevels,
  userId,
}) => {
  return (
    <div className="EditorSidebar-container">
      <div className="EditorSidebar-message">{message}</div>
      <div className="EditorSidebar-tools">
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="start" img="" />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="exit" img="" />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="platform"
          img=""
        />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="coin" img="" />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="spike" img="" />
        <EditTool setCurrentTool={setCurrentTool} currentTool={currentTool} name="name6" img="" />
      </div>
      <LevelData
        className="EditorSidebar-LevelData"
        setLevelData={setLevelData}
        levelData={levelData}
        message={message}
        setMessage={setMessage}
        publishedLevels={publishedLevels}
        setPublishedLevels={setPublishedLevels}
        userId={userId}
      />
    </div>
  );
};

export default EditorSidebar;
