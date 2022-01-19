import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "../../utilities.css";
import "./About.css";

const About = () => {
  return (
    <div className="main">
      <Helmet>
        <title>About</title>
      </Helmet>
      <h2 className="main-idea">
        Platformer is a web game where users can create and share levels with obstacles and
        platforms with the goal of getting from point A and point B.
      </h2>

      <p>The game consists of several key features: </p>

      <ul>
        <li>
          {" "}
          <span className="u-bold">Level</span>: This consists of a collection of obstacles and
          platforms that the user must navigate through to reach a goal. The level design consists
          of choosing the locations of various objects. The canvas on which a level is edited and
          designed is a grid. A level specifically is defined by attributes such as, but not limited
          to, name, obstacle locations, start location, end location, platform locations, and coin
          locations. These levels are created and imaged by YOU, the user! Furthermore, you as the
          architect of this level can select how fun you think the level is in addition to giving it
          a name plus other attributes! To get started with creating your own level, try out the{" "}
          <a className="link" href="http://localhost:4000/leveleditor/">
            level editor
          </a>
          !{" "}
        </li>
        <li>
          <span className="u-bold">Repository of Levels</span>: This is a collection of levels that
          are created by other users. In other words, you can not only create new levels of the
          Platformer, but also share what you have created with the community at large FOR FREE
          INSTANTLY! You will be able to filter through the levels by their difficulty, a funness
          score, and also by their name. To check out the levels created by people like you, try out{" "}
          <a className="link" href="http://localhost:4000/repository/">
            Levels Repository
          </a>
          !
        </li>

        <li>
          <span className="u-bold">User Profile:</span> To utilize Platformer is to have fun.
          Therefore, you can simply log in via your Google Account and start to create or play
          different levels of the Platformer. You can also check out how many levels you have
          created thus far in our system in addition to how many you have won! Feel free to
          customize your name as well!{" "}
          <a className="link" href="/">
            Get started today!
          </a>
          <p />
          <p />
          <h3 className="main-idea">What do you get out of the Platformer?</h3>
          <span>
            <span className="u-bold">Imagination</span> |{" "}
          </span>
          <span>Creativity | </span>
          <span>Ideation | </span>
          <span>Game Design | </span>
          <span>Decision Making | </span>
          <span>Fun | </span>
          <span>Awareness | </span>
          <span>Intelligence | </span>
          <span>Originality | </span>
          <span>Inspiration | </span>
          <span>Artistry | </span>
          <span>Ingenuity | </span>
          <span>Insight | </span>
          <span>Inventiveness | </span>
          <span>Novelty | </span>
          <span>
            <strong>Imagination</strong>
          </span>
          <div className="main-container-about">
            <img
              src="https://c.tenor.com/SnustcCENp4AAAAC/spongebob-squarepants-sad.gif"
              alt="Sad Spongebob"
            />
            <div className="arrow">
              <ArrowForwardIcon />
            </div>
            <img
              src="https://i0.wp.com/media1.giphy.com/media/3IP8R5HQch7Rm/giphy.gif?zoom=2"
              alt="Happy Spongebob"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default About;
