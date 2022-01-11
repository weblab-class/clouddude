import React, { useState, useEffect } from "react";
import Game from "../modules/Game";

import "../../utilities.css";
import "./LevelEditor.css";

const LevelEditor = () => {
  return (
    <div>
      <Sidebar />
      <Game />
    </div>
  );
};

export default LevelEditor;
