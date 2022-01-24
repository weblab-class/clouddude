import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Slider from "@material-ui/core/Slider";
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
  setActiveLevel,
  userId,
}) => {
  return (
    <div className="EditorSidebar-container">
      <div className="EditorSidebar-message">{message}</div>
      <div className="EditorSidebar-tools">
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="delete"
          img="https://i.imgur.com/sX8VgWy.png"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="start"
          img="https://i.imgur.com/lfAyDl6.png"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="exit"
          img="https://i.imgur.com/tTmmxis.png"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="platform"
          img="https://dl.dropboxusercontent.com/s/8430hxmrkdolsuo/grass.png?dl=0"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="falling"
          img="https://i.imgur.com/jh2X6dc.png"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="spike"
          img="https://dl.dropboxusercontent.com/s/7a8tzts1xzvl4v3/spikes.png?dl=0"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="coin"
          img="https://i.imgur.com/eTNmgCf.png"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="lock"
          img="https://www.dl.dropboxusercontent.com/s/hchmqqeq35o0hlk/lock.png?dl=0"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="key"
          img="https://www.dl.dropboxusercontent.com/s/a9t5307kthiyhli/smallKey.png?dl=0"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="spinner"
          img="https://i.imgur.com/sUdhdbm.png"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="spider"
          img="https://i.imgur.com/6vm977B.png"
        />
        <EditTool
          setCurrentTool={setCurrentTool}
          currentTool={currentTool}
          name="spider"
          img="https://i.imgur.com/6vm977B.png"
        />
      </div>
      <LevelData
        className="EditorSidebar-LevelData"
        setLevelData={setLevelData}
        levelData={levelData}
        message={message}
        setMessage={setMessage}
        publishedLevels={publishedLevels}
        setPublishedLevels={setPublishedLevels}
        setActiveLevel={setActiveLevel}
        userId={userId}
      />
    </div>
  );
};

export default EditorSidebar;
