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
    if (levelData.name === "") {
      setMessage("Name is Required");
      return;
    }
    if (levelData.description === "") {
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
      });
      await navigate("/play");
    }

    post("/api/level", levelData).then((level) => {
      console.log("level from frontend", level);
    });

    const body = { user: { levelsPublished: publishedLevels, _id: userId } };
    post("/api/profile", body).then((user) => {
      setPublishedLevels(user.levelsPublished);
    });
  });

  useEffect(() => {
    console.log(levelData);
  }, [levelData]);

  return (
    <div className="LevelData-container">
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Gravity</Form.Label>
          <Slider
            onChange={(event, value) => {
              setLevelData({ ...levelData, gravity: (Number(value) / 100) * 600 });
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
            aria-valuetext="gravity"
            value={Math.round((levelData.gravity / 600) * 100)}
            color="primary"
            min={-100}
            max={300}
            marks={[
              {
                value: -100,
                label: "-100",
              },
              {
                value: 0,
                label: "0",
              },
              {
                value: 100,
                label: "100",
              },
              {
                value: 200,
                label: "200",
              },
              {
                value: 300,
                label: "300",
              },
            ]}
            valueLabelDisplay="on"
          />
          <Form.Group className="mb-2" controlId="name"></Form.Group>
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
        <div className="LevelData-sliderContainer">
          <Form.Group className="" controlId="difficulty">
            <Form.Label>Difficulty</Form.Label>
            <Slider
              className="LevelData-slider  mt-4"
              onChange={(event, value) => {
                setLevelData({ ...levelData, difficulty: Number(value) });
                if (message !== "Design Your Level!") {
                  setMessage("Design Your Level!");
                }
              }}
              aria-valuetext="difficulty"
              value={levelData.difficulty}
              color="primary"
              marks={[
                {
                  value: 0,
                  label: "0",
                },
                {
                  value: 50,
                  label: "50",
                },
                {
                  value: 100,
                  label: "100",
                },
              ]}
              valueLabelDisplay="on"
            />
          </Form.Group>

          <Form.Group className="LevelData-slider" controlId="funness">
            <Form.Label>Funness</Form.Label>
            <Slider
              className="LevelData-slider mt-4"
              onChange={(event, value) => {
                setLevelData({ ...levelData, funness: Number(value) });
                if (message !== "Design Your Level!") {
                  setMessage("Design Your Level!");
                }
              }}
              aria-valuetext="funnes"
              value={levelData.funness}
              color="primary"
              marks={[
                {
                  value: 0,
                  label: "0",
                },
                {
                  value: 50,
                  label: "50",
                },
                {
                  value: 100,
                  label: "100",
                },
              ]}
              valueLabelDisplay="on"
            />
          </Form.Group>
        </div>
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
