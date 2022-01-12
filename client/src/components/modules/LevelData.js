/* eslint-disable */ 
 
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../../utilities.css";
import { post } from "../../utilities";

import "./LevelData.css";

const LevelData = ({
  start, exit, platforms, decoration, coins, obstacles
}) => {
  const [name, setName] = useState("");
  const [funnes, setFunness] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

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
    post('/api/level', body).then((level) => {
      console.log("level from frontend",level);
    });
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Level Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Range onChange={(event) => setDifficulty(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="funness">
          <Form.Label>Funness</Form.Label>
          <Form.Range onChange={(event) => setFunness(event.target.value)} />
        </Form.Group>
      </Form>

      <Button variant="primary" onClick={addLevel}>
        Save Level
      </Button>
    </div>
  );
};

export default LevelData;
