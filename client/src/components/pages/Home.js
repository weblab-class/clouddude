import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Button from "react-bootstrap/Button";

import "../../utilities.css";
import "./Home.css";

const Home = () => {
  return (
    <div className="body">
      <center>
        <h1 className="title">PLATFORMER</h1>
        <Link to="/repository/" className="NavBar-link">
          <Button variant="primary">Play A Level</Button>
        </Link>
        <Link to="/leveleditor/" className="NavBar-link">
          <Button variant="primary">Design A Level</Button>
        </Link>
        <p />
        <p />
        <h2 className="subtitle">
          A web game where YOU can create levels with obstacles and platforms with the goal of going
          from point A and point B.
        </h2>
      </center>
    </div>
  );
};

export default Home;
