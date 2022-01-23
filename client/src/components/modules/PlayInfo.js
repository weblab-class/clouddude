import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { post } from "../../utilities";

const PlayInfo = ({
  levelDifficulty, setLevelDifficulty, levelFunness, setLevelFunness
}) => {
  const handleUpdate = () => {
    const body = { message: "update", levelDifficulty, levelFunness };
    post("/api/level", body).then((updatedLevel) => {
      console.log("updating difficulty and funness levels", updatedLevel);
    });
  };

  return (
    <div>
      <div>
        <h4>Difficulty:</h4>
        <StarRatings
          rating={levelDifficulty}
          starRatedColor="blue"
          changeRating={(newRating) => setLevelDifficulty(newRating)}
          numberOfStars={5}
          name="difficulty"
          starDimension="20px"
          starSpacing="8px"
        />
      </div>
      <p />
      <div>
        <h4>Funness:</h4>
        <StarRatings
          rating={levelFunness}
          starRatedColor="blue"
          changeRating={(newRating) => setLevelFunness(newRating)}
          numberOfStars={5}
          name="funness"
          starDimension="20px"
          starSpacing="8px"
        />
      </div>
      <p />
      <button type="submit" onClick={handleUpdate} className="btn btn-secondary">
        Submit Rating
      </button>
    </div>
  );
};

export default PlayInfo;
