import React, { useState, useEffect } from "react";
import SingleLevel from "../modules/SingleLevel";

import "../../utilities.css";
import "./Repository.css";

const Repository = () => {
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

  return (
    <>
      {levels.map((level) => {
        return (
          <div className="level-container">
            <SingleLevel />
          </div>
        );
      })}
    </>
  );
};

export default Repository;
