import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { post, get } from "../../utilities";
import "./PlayInfo.css";

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
      const previousFunnes = levelInfo.funness;
      const previousDifficulty = levelInfo.difficulty;
      const previousnumRatings = levelInfo.numRatings;

      const newNumRatings = previousnumRatings + 1;
      const newLevelDifficulty = Math.round((levelDifficulty + previousDifficulty));
      const newLevelFunness = Math.round((levelFunness + previousFunnes));

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
      console.log(Postbody);
      post("/api/level", Postbody).then(() => {
        setUserMessage("Thanks for the feedback!");
        setLevelDifficulty(0);
        setLevelFunness(0);
      });
    });
  };

  return (
    <div className="PlayInfo-container">
      <div className="PlayInfo-gameInfo">
        <div className="PlayInfo-tile">
          <h4 className="PlayInfo-headerText">Name: </h4>
          <div className="PlayInfo-infoText">{activeLevel.name}</div>
        </div>
        <div className="PlayInfo-tile">
          <h4 className="PlayInfo-headerText">Description: </h4>
          <div className="PlayInfo-infoText">{activeLevel.description}</div>
        </div>
        <div className="PlayInfo-tile">
          <h4 className="PlayInfo-headerText">Creator: </h4>
          <div className="PlayInfo-infoText">{activeLevel.creator}</div>
        </div>
      </div>
      <div className="PlayInfo-ratings">
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
            starHoverColor="green"
            changeRating={(newRating) => setLevelFunness(newRating)}
            numberOfStars={5}
            name="funness"
            starDimension="20px"
            starSpacing="8px"
          />
        </div>
        <p />
        <button type="submit" onClick={handleUpdate} className="btn btn-secondary PlayInfo-button">
          Submit Rating
        </button>
        <p className="Play">{userMessage}</p>
      </div>
    </div>
  );
};

export default PlayInfo;
