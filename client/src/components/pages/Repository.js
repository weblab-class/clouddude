import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import SearchIcon from "@material-ui/icons/Search";
import Slider from "@material-ui/core/Slider";

import { get } from "../../utilities";

import Pagination from "../modules/Pagination";

import "../../utilities.css";
import "./Repository.css";

const Repository = ({ setActiveLevel }) => {
  const [showModal, setShowModal] = useState(false);

  const [levelDifficulty, setLevelDifficulty] = useState(100);
  const [levelFunness, setLevelFunness] = useState(100);
  const [levelName, setLevelName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [levels, setLevels] = useState([]);

  // in the beginning, get all levels
  useEffect(() => {
    const query = { type: "all" };
    get("/api/levels", query).then((levelObjects) => {
      setLevels(levelObjects);
    });
  }, []);

  // sorting by name, difficulty, and funness
  useEffect(() => {
    const query = { type: "sort", sortBy };
    get("/api/levels", query).then((levelObjects) => {
      setLevels(levelObjects);
    });
  }, [sortBy]);

  // filter the levels based on user input
  const filter = () => {
    setShowModal(false);
    const query = {
      name: levelName,
      userName: creatorName,
      difficulty: Number(levelDifficulty),
      funness: Number(levelFunness),
      type: "filter",
    };
    get("/api/levels", query).then((res) => {
      setLevels(res);
    });
  };

  document.body.style.overflow = "auto";
  return (
    <div className="main-container">
      <Helmet>
        <title>Cloudverse</title>
      </Helmet>
      <h3 className="Repository-title">Cloudverse</h3>
      <div>
        <div className="input-group">
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="button btn btn-primary Repository-button"
          >
            <SearchIcon />
            Search for a Level
          </button>
        </div>
        <p />
        <p className="or">or</p>
        <div>
          <h4>Sort By:</h4>
          <Form>
            <div key="inline-radio" className="mb-3">
              <Form.Check
                onClick={() => setSortBy("name")}
                inline
                label="Name"
                name="group1"
                type="radio"
                id="inline-radio-1"
              />
              <Form.Check
                inline
                label="Difficulty"
                name="group1"
                type="radio"
                id="inline-radio-2"
                onClick={() => setSortBy("difficulty")}
              />
              <Form.Check
                onClick={() => setSortBy("funness")}
                inline
                label="Funness"
                name="group1"
                type="radio"
                id="inline-radio-3"
              />
            </div>
          </Form>
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
              <Form.Label>Level Name</Form.Label>
              <Form.Control
                onChange={(event) => setLevelName(event.target.value)}
                type="text"
                placeholder="Enter Level Name Keyword"
                value={levelName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Creator Name</Form.Label>
              <Form.Control
                onChange={(event) => setCreatorName(event.target.value)}
                type="text"
                placeholder="Enter Creator Name Keyword"
                value={creatorName}
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
                    label: "N/A",
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
                    label: "N/A",
                  },
                ]}
                valueLabelDisplay="on"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="Repository-button"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" className="Repository-button" onClick={filter}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>

      <Pagination itemsPerPage={4} levels={levels} setActiveLevel={setActiveLevel} />
    </div>
  );
};

export default Repository;
