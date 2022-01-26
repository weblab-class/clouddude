/* eslint-disable */

import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Slider from "@material-ui/core/Slider";
import { navigate } from "@reach/router";

import "../../utilities.css";
import { post } from "../../utilities";

import "./LevelData.css";

const LevelData = ({
  userId,
  levelData,
  setLevelData,
  message,
  setMessage,
  publishedLevels,
  setPublishedLevels,
  setActiveLevel,
}) => {
  //Posts the level on submission and updates the number of published levels
  const addLevel = useCallback(async () => {
    if (levelData.name === "" || levelData.name === "No Level Selected") {
      setMessage("Name is Required");
      return;
      c;
    }
    if (levelData.description === "" || levelData.description === "N/A") {
      setMessage("Description is Required");
      return;
    } else {
      setMessage("Submitted Successfully");
      setActiveLevel({ ...levelData });
      setLevelData({
        ...levelData,
        start: { x: undefined, y: undefined },
        exit: { x: undefined, y: undefined },
        platforms: [],
        coins: [],
        obstacles: [],
        gravity: { x: 0, y: 600 },
        numRatings: 0,
      });
      await navigate("/play");
    }

    post("/api/level", levelData).then((level) => {});

    const body = { user: { levelsPublished: publishedLevels, _id: userId } };
    post("/api/profile", body).then((user) => {
      setPublishedLevels(user.levelsPublished);
    });
  });

  return (
    <div className="LevelData-container">
      <Form>
        <Form.Group className="mb-1" controlId="name">
          <div className="LevelData-sliderContainer">
            <Form.Group className="LevelData-slider" controlId="X-Gravity">
              <Form.Label>X-Gravity</Form.Label>
              <Slider
                className="LevelData-sliderbar"
                step={10}
                onChange={(event, value) => {
                  setLevelData({
                    ...levelData,
                    gravity: { x: (Number(value) / 100) * 10000, y: levelData.gravity.y },
                  });
                  if (message !== "Design Your Level!") {
                    setMessage("Design Your Level!");
                  }
                }}
                onChangeCommitted={(event, value) => {
                  setLevelData({
                    ...levelData,
                    gravity: { x: (Number(value) / 100) * 10000, y: levelData.gravity.y },
                  });
                  setTimeout(() => {
                    document.dispatchEvent(
                      new KeyboardEvent("keydown", {
                        key: "r",
                        keyCode: 82,
                        bubbles: true,
                      })
                    );
                  }, 15);
                  setTimeout(() => {
                    document.dispatchEvent(
                      new KeyboardEvent("keyup", {
                        key: "r",
                        keyCode: 82,
                        bubbles: true,
                      })
                    );
                  }, 50);
                }}
                aria-valuetext="x-gravity"
                min={-200}
                max={200}
                value={Math.round((levelData.gravity.x / 10000) * 100)}
                color="primary"
                marks={[]}
                valueLabelDisplay="auto"
                components={{
                  ValueLabel,
                }}
              />
            </Form.Group>

            <Form.Group className="LevelData-slider" controlId="Y-Gravity">
              <Form.Label>Y-Gravity</Form.Label>
              <Slider
                className="LevelData-sliderbar"
                step={10}
                onChange={(event, value) => {
                  setLevelData({
                    ...levelData,
                    gravity: { x: levelData.gravity.x, y: (Number(value) / 100) * 600 },
                  });
                  if (message !== "Design Your Level!") {
                    setMessage("Design Your Level!");
                  }
                }}
                onChangeCommitted={(event, value) => {
                  setLevelData({
                    ...levelData,
                    gravity: { x: levelData.gravity.x, y: (Number(value) / 100) * 600 },
                  });
                  setTimeout(() => {
                    document.dispatchEvent(
                      new KeyboardEvent("keydown", {
                        key: "r",
                        keyCode: 82,
                        bubbles: true,
                      })
                    );
                  }, 15);
                  setTimeout(() => {
                    document.dispatchEvent(
                      new KeyboardEvent("keyup", {
                        key: "r",
                        keyCode: 82,
                        bubbles: true,
                      })
                    );
                  }, 50);
                }}
                aria-valuetext="y-gravity"
                min={-200}
                max={200}
                value={Math.round((levelData.gravity.y / 600) * 100)}
                color="primary"
                marks={[]}
                valueLabelDisplay="auto"
                components={{
                  ValueLabel,
                }}
              />
            </Form.Group>
          </div>
          <Form.Group className="" controlId="name"></Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(event) => {
              setLevelData({ ...levelData, name: event.target.value });
              if (message !== "Design Your Level!") {
                setMessage("Design Your Level!");
              }
            }}
            type="text"
            placeholder="Level Name"
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="name">
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={(event) => {
              setLevelData({ ...levelData, description: event.target.value });
              if (message !== "Design Your Level!") {
                setMessage("Design Your Level!");
              }
            }}
            type="text"
            placeholder="Description"
          />
        </Form.Group>
      </Form>
      <div className="LevelData-buttonContainer">
        <Button className="LevelData-button" variant="primary" onClick={addLevel}>
          Save Level
        </Button>
        <Button
          className="LevelData-button"
          variant="primary"
          onClick={() => {
            setLevelData({
              ...levelData,
              start: { x: 25, y: 25 },
              exit: { x: 1575, y: 875 },
              platforms: [],
              coins: [],
              obstacles: [],
              gravity: { x: 0, y: 600 },
              numRatings: 0,
            });
            setMessage("Level Cleared!");
            setTimeout(() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "r",
                  keyCode: 82,
                  bubbles: true,
                })
              );
            }, 15);
            setTimeout(() => {
              document.dispatchEvent(
                new KeyboardEvent("keyup", {
                  key: "r",
                  keyCode: 82,
                  bubbles: true,
                })
              );
            }, 50);
          }}
        >
          Clear Level
        </Button>
      </div>
    </div>
  );
};

export default LevelData;

function ValueLabel({ children, value }) {
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
