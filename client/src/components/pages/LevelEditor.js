import React, { useState, useEffect } from "react";
import Game from "../modules/Game";
import EditorSidebar from "../modules/EditorSidebar";

import "../../utilities.css";
import "./LevelEditor.css";

const LevelEditor = () => {
  const [currentTool, setCurrentTool] = useState(null);

  return (
    <div className="LevelEditor-container">
      <EditorSidebar setTool={setCurrentTool} />
      <Game />
    </div>
  );
};

export default LevelEditor;
