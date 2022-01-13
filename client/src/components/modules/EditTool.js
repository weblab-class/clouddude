import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./EditTool.css";

const EditTool = ({ setCurrentTool, currentTool, name, img }) => {
  return (
    <div
      onClick={() => {
        setCurrentTool(name);
      }}
      role="button"
      className={
        currentTool === name
          ? "EditTool-container EditTool-selected"
          : "EditTool-container EditTool-unselected"
      }
    >
      {name}
    </div>
  );
};

export default EditTool;
