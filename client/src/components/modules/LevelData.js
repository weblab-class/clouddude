/* eslint-disable */

import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Slider from "@material-ui/core/Slider";

import "../../utilities.css";
import { post } from "../../utilities";

import "./LevelData.css";

const LevelData = ({ levelData, setLevelData }) => {
  //Posts the level on submission
  const addLevel = useCallback(() => {
    console.log(levelData);
    /*
    post("/api/level", levelData).then((level) => {
      console.log("level from frontend", level);
    }); */
  }, [levelData]);

  useEffect(() => {
    console.log(levelData);
  }, [levelData]);

  return (
    <div className="LevelData-container">
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(event) => {
              setLevelData({ ...levelData, name: event.target.value });
            }}
            type="text"
            placeholder="Enter Level Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Slider
            onChange={(event, value) => setLevelData({ ...levelData, difficulty: Number(value) })}
            aria-valuetext="difficulty"
            value={levelData.difficulty}
            color="primary"
            marks={[
              {
                value: 0,
                label: "0",
              },
              {
                value: 50,
                label: "50",
              },
              {
                value: 100,
                label: "100",
              },
            ]}
            valueLabelDisplay="on"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="funness">
          <Form.Label>Funness</Form.Label>
          <Slider
            onChange={(event, value) => setLevelData({ ...levelData, funness: Number(value) })}
            aria-valuetext="funnes"
            value={levelData.funness}
            color="primary"
            marks={[
              {
                value: 0,
                label: "0",
              },
              {
                value: 50,
                label: "50",
              },
              {
                value: 100,
                label: "100",
              },
            ]}
            valueLabelDisplay="on"
          />
        </Form.Group>
      </Form>
      <div className="LevelData-buttonContainer">
        <Button className="LevelData-button" variant="primary" onClick={addLevel}>
          Save Level
        </Button>
        <Button
          className="LevelData-button"
          variant="primary"
          onClick={() =>
            setLevelData({
              ...levelData,
              start: { x: undefined, y: undefined },
              exit: { x: undefined, y: undefined },
              platforms: [],
              coins: [],
              obstacles: [],
            })
          }
        >
          Clear Level
        </Button>
      </div>
    </div>
  );
};

export default LevelData;
