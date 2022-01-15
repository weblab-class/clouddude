import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import SearchIcon from "@material-ui/icons/Search";
import Slider from "@material-ui/core/Slider";
import { v4 as uuidv4 } from "uuid";

import { get } from "../../utilities";

import SingleLevel from "../modules/SingleLevel";

import "../../utilities.css";
import "./Repository.css";

const Repository = ({ setActiveLevel }) => {
  const [showModal, setShowModal] = useState(false);

  const [levelDifficulty, setLevelDifficulty] = useState(0);
  const [levelFunness, setLevelFunness] = useState(0);
  const [levelName, setLevelName] = useState("");

  const [levels, setLevels] = useState([]);

  // in the beginning, get all levels
  useEffect(() => {
    const query = { type: "all" };
    get("/api/levels", query).then((levelObjects) => {
      setLevels(levelObjects);
    });
  }, []);

  // filter the levels based on user input
  const filter = () => {
    setShowModal(false);
    const query = {
      name: levelName,
      difficulty: Number(levelDifficulty),
      funness: Number(levelFunness),
      type: "filter"
    };
    get("/api/levels", query).then((res) => {
      setLevels(res);
    });
  };

  return (
    <div className="main-container">
      <Helmet>
        <title>Levels Repository</title>
      </Helmet>
      <h3>Levels Repository</h3>
      <div className="input-group">
        <div>
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="button btn btn-primary"
          >
            <SearchIcon />
            Search for a Level
          </button>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You can filter a level by difficulty score, name, etc.</p>

          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(event) => setLevelName(event.target.value)}
                type="text"
                placeholder="Enter Name Keyword"
                value={levelName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="difficulty">
              <Form.Label>Difficulty</Form.Label>
              <Slider
                onChange={(event, value) => setLevelDifficulty(Number(value))}
                value={levelDifficulty}
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
                onChange={(event, value) => setLevelFunness(Number(value))}
                value={levelFunness}
                aria-valuetext="funness"
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={filter}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="level-container">
        {levels.map((level) => {
          return (
            <div key={uuidv4()}>
              <SingleLevel level={level} setActiveLevel={setActiveLevel} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Repository;
