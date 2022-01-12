import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from 'react-helmet';

import { get } from "../../utilities";

import SingleLevel from "../modules/SingleLevel";

import "../../utilities.css";
import "./Repository.css";

const Repository = () => {
  const [showModal, setShowModal] = useState(false);

  const [levelDifficulty, setLevelDifficulty] = useState(0);
  const [levelFunness, setLevelFunness] = useState(0);
  const [levelName, setLevelName] = useState("");

  const [levels, setLevels] = useState([
    {
      creator: "Bob",
      name: "Twisted",
      start: { x: 20, y: 20 },
      exit: { x: 40, y: 45 },
      platforms: [
        { image: "img1", x: 25, y: 20 },
        { image: "img2", x: 30, y: 30 },
      ],
      decoration: [{ frame: 35, x: 35, y: 35 }],
      coins: [
        { x: 11, y: 40 },
        { x: 12, y: 41 },
      ],
      obstacles: [
        { type: "obs1", x: 40, y: 20 },
        { type: "obs2", x: 41, y: 21 },
      ],
      funness: 9,
      difficulty: 4,
    },
    {
      creator: "Foo",
      name: "Roller Coaster",
      start: { x: 20, y: 20 },
      exit: { x: 40, y: 45 },
      platforms: [
        { image: "img11", x: 25, y: 20 },
        { image: "img22", x: 30, y: 30 },
      ],
      decoration: [{ frame: 35, x: 35, y: 35 }],
      coins: [
        { x: 11, y: 40 },
        { x: 12, y: 41 },
      ],
      obstacles: [
        { type: "obs11", x: 40, y: 20 },
        { type: "obs22", x: 41, y: 21 },
      ],
      funness: 5,
      difficulty: 9,
    },
  ]);

  // in the beginning, get all levels
  useEffect(() => {
    const query = { name: '', difficulty: '', funness: '' };
    get("/api/levels", query).then((levelObjects) => {
      setLevels(levelObjects);
    });
  }, []);

  // filter the levels based on user input
  const filter = () => {
    setShowModal(false);
    const query = { name: levelName, difficulty: levelDifficulty, funness: levelFunness };
    get('api/levels', query).then((res) => {
      setLevels(res);
    });
  };

  return (
    <>
      <Helmet>
        <title>Levels Repository</title>
      </Helmet>
      <input onClick={() => setShowModal(true)} type="text" placeholder="Search" />
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
                placeholder="Name"
                value={levelName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="difficulty">
              <Form.Label>Difficulty</Form.Label>
              <Form.Range
                value={levelDifficulty}
                onChange={(event) => setLevelDifficulty(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="funness">
              <Form.Label>Funness</Form.Label>
              <Form.Range
                value={levelFunness}
                onChange={(event) => setLevelFunness(event.target.value)}
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
            <div key={level._id}>
              <SingleLevel level={level} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Repository;
