/* eslint-disable */

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Slider from "@material-ui/core/Slider";

import "../../utilities.css";
import { post } from "../../utilities";

import "./LevelData.css";

const LevelData = ({ start, exit, platforms, decoration, coins, obstacles }) => {
  const [name, setName] = useState("");
  const [funnes, setFunness] = useState(100);
  const [difficulty, setDifficulty] = useState(50);

  const addLevel = () => {
    const body = {
      name: name,
      start: start,
      exit: exit,
      platforms: platforms,
      decoration: decoration,
      coins: coins,
      obstacles: obstacles,
      funness: funnes,
      difficulty: difficulty,
    };
    post("/api/level", body).then((level) => {
      console.log("level from frontend", level);
    });
  };

  return (
    <div className="LevelData-container">
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter Level Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Slider
            onChange={(event, value) => setDifficulty(Number(value))}
            value={difficulty}
            aria-valuetext="difficulty"
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
            onChange={(event, value) => setFunness(Number(value))}
            value={funnes}
            aria-valuetext="funnes"
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

      <Button variant="primary" onClick={addLevel}>
        Save Level
      </Button>
    </div>
  );
};

export default LevelData;
