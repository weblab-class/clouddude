import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { post, get } from "../../utilities";

const PlayInfo = ({
  levelDifficulty,
  setLevelDifficulty,
  levelFunness,
  setLevelFunness,
  activeLevel,
  levelID,
}) => {
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    setUserMessage("");
  }, []);

  const handleUpdate = () => {
    let getBody;
    if (levelID) {
      getBody = { _id: levelID };
    } else {
      getBody = {
        name: activeLevel.name,
        numRatings: activeLevel.numRatings,
        creator: activeLevel.creator,
      };
    }

    get("/api/filterlevel/", getBody).then((levelInfo) => {
      console.log("getting from backend: ", levelInfo);

      const previousFunnes = levelInfo.funness;
      const previousDifficulty = levelInfo.difficulty;
      const previousnumRatings = levelInfo.numRatings;

      const newNumRatings = previousnumRatings + 1;
      const newLevelDifficulty = Math.round((levelDifficulty + previousDifficulty) / newNumRatings);
      const newLevelFunness = Math.round((levelFunness + previousFunnes) / newNumRatings);

      let Postbody;
      if (levelID) {
        Postbody = { _id: levelID };
      } else {
        Postbody = {
          message: "update",
          levelDifficulty: newLevelDifficulty,
          levelFunness: newLevelFunness,
          levelRatings: newNumRatings,
          name: activeLevel.name,
          numRatings: activeLevel.numRatings,
          creator: activeLevel.creator,
        };
      }

      post("/api/level", Postbody).then(() => {
        setUserMessage("Thanks for the feedback!");
        setLevelDifficulty(0);
        setLevelFunness(0);
      });
    });
  };

  return (
    <div>
      <div>
        <h4>Difficulty:</h4>
        <StarRatings
          rating={levelDifficulty}
          starRatedColor="red"
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
          starRatedColor="green"
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
      <p className="text-danger">{userMessage}</p>
    </div>
  );
};

export default PlayInfo;
