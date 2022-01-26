import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import SearchIcon from "@material-ui/icons/Search";
import StarRatings from "react-star-ratings";
import ReactTooltip from "react-tooltip";

import { get } from "../../utilities";

import Pagination from "../modules/Pagination";

import "../../utilities.css";
import "./Repository.css";

const Repository = ({ setActiveLevel, setLevelID }) => {
  const [showModal, setShowModal] = useState(false);

  const [levelDifficulty, setLevelDifficulty] = useState(0);
  const [levelFunness, setLevelFunness] = useState(0);
  const [levelName, setLevelName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [images, setImages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // in the beginning, get all levels and images
  useEffect(() => {
    const query = { type: "all" };
    get("/api/levels", query).then((levelObjects) => {
      let allImages = [];
      for (let i = 0; i < 100; i++) {
        const image = `https://picsum.photos/500/300?random=${i}`;
        allImages = [...allImages, image];
      }
      setImages(allImages);
      setLevels(levelObjects);
    });
  }, []);

  useEffect(() => {
    let allImages = [];
    for (let i = 0; i < 100; i++) {
      const index = Math.floor(Math.random() * 100);
      const image = `https://picsum.photos/500/300?random=${index}`;
      allImages = [...allImages, image];
    }
    setImages(allImages);
    setIsFiltering(false);
  }, [isFiltering]);

  // sorting by name, difficulty, and funness
  useEffect(() => {
    const query = { type: "sort", sortBy };
    get("/api/levels", query).then((levelObjects) => {
      setLevels(levelObjects);
      setIsFiltering(true);
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
      setIsFiltering(true);
      setLevelFunness(0);
      setLevelDifficulty(0);
    });
  };

  document.body.style.overflow = "auto";
  return (
    <div className="Repository-container">
      <Helmet>
        <title>Level Repository</title>
      </Helmet>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="Repository-textLabel">
            Filter the levels by name, creator, difficulty, or funness!
          </p>

          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="Repository-textLabel">Level Name</Form.Label>
              <Form.Control
                onChange={(event) => setLevelName(event.target.value)}
                type="text"
                placeholder="Enter Level Name Keyword"
                value={levelName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="Repository-textLabel">Creator Name</Form.Label>
              <Form.Control
                onChange={(event) => setCreatorName(event.target.value)}
                type="text"
                placeholder="Enter Creator Name Keyword"
                value={creatorName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="difficulty">
              <Form.Label className="Repository-textLabel">Difficulty</Form.Label>
              {"   "}
              <StarRatings
                rating={levelDifficulty}
                starRatedColor="red"
                changeRating={(newRating) => setLevelDifficulty(newRating)}
                numberOfStars={5}
                name="difficulty-filter"
                starDimension="20px"
                starSpacing="8px"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="funness">
              <Form.Label className="Repository-textLabel">Funness</Form.Label>
              {"   "}
              <StarRatings
                rating={levelFunness}
                starRatedColor="green"
                changeRating={(newRating) => setLevelFunness(newRating)}
                numberOfStars={5}
                name="funness-filter"
                starDimension="20px"
                starSpacing="8px"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button className="Repository-button" onClick={filter}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="Repository-navigation">
        <h2 className="Repository-title">Level Repository</h2>
        <div className="Repositry-sorting">
          <div className="Repository-sortingTools">
            <p className="sorting-label">Sort By:</p>
            <Form className="Repository-form">
              <div key="inline-radio" className="mb-3">
                <ReactTooltip type="info" />
                <Form.Check
                  data-tip="Sort by name(A-Z)"
                  onClick={() => setSortBy("name")}
                  inline
                  label="Name"
                  name="group1"
                  type="radio"
                  id="inline-radio-1"
                />
                <ReactTooltip type="info" />
                <Form.Check
                  inline
                  data-tip="Sort by difficulty(Low-High)"
                  label="Difficulty"
                  name="group1"
                  type="radio"
                  id="inline-radio-2"
                  onClick={() => setSortBy("difficulty")}
                />
                <ReactTooltip type="info" />
                <Form.Check
                  onClick={() => setSortBy("funness")}
                  data-tip="Sort by funness(High-Low) | Funness = Fun Rating"
                  inline
                  label="Funness"
                  name="group1"
                  type="radio"
                  id="inline-radio-3"
                />
              </div>
            </Form>
          </div>
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="button btn btn-primary Repository-searchButton Repository-button"
          >
            <SearchIcon />
            Search for a Level
          </button>
        </div>
        <Pagination
          itemsPerPage={4}
          levels={levels}
          setActiveLevel={setActiveLevel}
          setLevelID={setLevelID}
          images={images}
        />
      </div>
    </div>
  );
};

export default Repository;
