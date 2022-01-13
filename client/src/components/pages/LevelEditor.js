import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Game from "../modules/Game";

import EditorSidebar from "../modules/EditorSidebar";

import "../../utilities.css";
import "./LevelEditor.css";

const LevelEditor = () => {
  const [currentTool, setCurrentTool] = useState(null);
  const [levelData, setLevelData] = useState({});

  return (
    <div className="LevelEditor-container">
      <Helmet>
        <title>Level Designer</title>
      </Helmet>
      <div className="LevelEditor-sidebar">
        <EditorSidebar className="LevelEditor-sidebar" setsetTool={setCurrentTool} />
      </div>
      <Game className="LevelEditor-game" />
    </div>
  );
};

export default LevelEditor;
