import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import StarRatings from "react-star-ratings";
import ReactTooltip from "react-tooltip";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./SingleLevel.css";

const SingleLevel = ({ level, setActiveLevel, index }) => {
  return (
    <>
      {console.log(level)}
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={`https://picsum.photos/500/300?random=${index}`} />
        <center>
          <div data-tip="Difficulty">
            <ReactTooltip type="info" />
            <StarRatings
              rating={level.difficulty}
              starRatedColor="red"
              numberOfStars={5}
              name="difficulty-rating"
              starDimension="20px"
              starSpacing="3px"
            />
          </div>
          <div data-tip="Funness">
            <ReactTooltip type="info" />
            <StarRatings
              rating={level.funness}
              starRatedColor="green"
              numberOfStars={5}
              name="funness-rating"
              starDimension="20px"
              starSpacing="3px"
            />
          </div>
        </center>
        <Card.Body>
          <Card.Title>{level.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{level.creator}</Card.Subtitle>
          <Card.Text>{level.description}</Card.Text>
          <Link to="/play/">
            <Button
              onClick={() => setActiveLevel(level)}
              className="Repository-button"
              variant="primary"
            >
              Play
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleLevel;
