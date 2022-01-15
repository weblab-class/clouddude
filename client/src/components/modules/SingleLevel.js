import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./SingleLevel.css";

const SingleLevel = ({ level, setActiveLevel }) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://upload.wikimedia.org/wikipedia/commons/6/68/Cliff_2D_Game_Platformer_Ground_Game_Asset.png"
        />
        <Card.Body>
          <Card.Title>{level.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{level.creator}</Card.Subtitle>

          <Card.Text>Level Description</Card.Text>
          <Link to="/leveleditor/">
            <Button onClick={() => setActiveLevel(level)} variant="primary">
              Play
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleLevel;
