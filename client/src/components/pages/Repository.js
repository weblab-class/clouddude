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

const Repository = ({ setActiveLevel, setLevelID, name }) => {
  const [showModal, setShowModal] = useState(false);

  const [levelDifficulty, setLevelDifficulty] = useState(0);
  const [levelFunness, setLevelFunness] = useState(0);
  const [levelName, setLevelName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [images, setImages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isAscending, setIsAscending] = useState(false);

  // in the beginning, get all levels
  useEffect(() => {
    const query = { type: "all" };
    get("/api/levels", query).then((levelObjects) => {
      // let allImages = [];
      // for (let i = 0; i < 100; i++) {
      //   const image = `https://picsum.photos/500/300?random=${i}`;
      //   allImages = [...allImages, image];
      // }
      // setImages(allImages);
      setLevels(levelObjects);
    });
  }, [name]);

  // in the beginning, get all images
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
    let upOrDown;
    if (isAscending === true) {
      upOrDown = 1;
    } else if (isAscending === false) {
      upOrDown = -1;
    } else {
      upOrDown = 1;
    }

    const query = { type: "sort", sortBy, isAscending: upOrDown };
    get("/api/levels", query).then((levelObjects) => {
      setLevels(levelObjects);
      setIsFiltering(true);
    });
  }, [sortBy, isAscending]);

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
                svgIconPath="M41.2998276,8.9405003c5.1903992,0,8.6258965-0.9922004,10.5028992-3.0342002
    C53.4609261,4.1016002,53.4609261,1.9786,53.4599266,0.5h-1l-1,0.0743C51.4609261,1.7989,51.4609261,3.3223,50.3300247,4.5528002
    c-1.4559975,1.5839996-4.4940987,2.3876996-9.0301971,2.3876996c-4.1172028,0-7.1532898,1.1064-9.0235023,3.2900004
    c-2.4276981,2.8339996-1.9081993,6.3935995-1.8846989,6.5430002c0.0049114,0.0314999,0.0226002,0.0565987,0.0301991,0.0868988
    h-4.0018997c-0.5527,0-1,0.4473-1,1v5.9131012c-8.8017998,2.3915997-14.879899,10.3016987-14.879899,19.5067997
    C10.5400267,54.4296989,19.6103268,63.5,30.7597256,63.5s20.2207012-9.0703011,20.2207012-20.2196999
    c0-8.7256012-5.4501991-16.3203011-13.6406021-19.1259995v-6.2939014c0-0.5527-0.4472847-1-1-1h-3.9916992
    c0.0311012-0.1238995,0.0400009-0.2556,0.0200005-0.3895988c-0.0038986-0.0284004-0.3915882-2.8331003,1.4424133-4.9571009
    C35.2851257,9.8066998,37.8047256,8.9405003,41.2998276,8.9405003z M36.0498276,25.8388996
    c7.6133003,2.3076,12.9305992,9.4795017,12.9305992,17.4414005C48.9804268,53.3272018,40.8066254,61.5,30.7597256,61.5
    c-10.0467987,0-18.2196999-8.1727982-18.2196999-18.2196999c0-8.5360985,5.7997999-15.8358994,14.1045122-17.7529011
    c0.4540882-0.1044998,0.7753868-0.5087986,0.7753868-0.9745998v-5.6924h7.919899v6.0215015
    C35.3398247,25.3223,35.6279259,25.7110004,36.0498276,25.8388996zM27.413126,29.2910995c-0.1064987,0.0272999-10.6728992,2.8408012-10.6728992,13.3690987c0,0.5527,0.4472008,1,1,1
    c0.5527,0,1-0.4473,1-1c0-8.9569969,8.7938995-11.3349991,9.1688995-11.4315987
    c0.5333004-0.1387005,0.8554993-0.6826992,0.7187996-1.2167988C28.4902267,29.4766006,27.9463272,29.1534004,27.413126,29.2910995z"
                svgIconViewBox="0 0 64 64"
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
                svgIconPath="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"
                svgIconViewBox="0 0 24 24"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="Repository-button"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
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
                <button
                  onClick={() => setIsAscending(!isAscending)}
                  type="button"
                  className="button btn btn-primary Repository-orderButton Repository-button"
                >
                  <div className="Repository-orderText">{isAscending ? "↑" : "↓"}</div>
                </button>
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
          isAscending={isAscending}
          setIsAscending={setIsAscending}
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
