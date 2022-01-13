import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import "../../utilities.css";
import "./About.css";

const About = () => {
  return (
    <div className="main">
      <Helmet>
        <title>About</title>
      </Helmet>

      <h2>
        Platformer is a web game where users can create and share levels with obstacles and
        platforms with the goal of getting from point A and point B.
      </h2>

      <p>The game consists of several key features: </p>

      <ul>
        <li>
          {" "}
          Level: This consists of a collection of obstacles and platforms that the user must
          navigate through to reach a goal. The level design consists of choosing the locations of
          various objects. The canvas on which a level is edited and designed is a grid. A level
          specifically is defined by attributes such as, but not limited to, name, obstacle
          locations, start location, end location, platform locations, and coin locations. These
          levels are created and imaged by YOU, the user! Furthermore, you as the architect of this
          level can select how fun you think the level is in addition to giving it a name plus other
          attributes! To get started with creating your own level, try out the
{" "}
          <a href="http://localhost:4000/leveleditor/">level editor</a>
!
{" "}
        </li>
        <li>
          Repository of Levels: This is a collection of levels that are created by other users. In
          other words, you can not only create new levels of the Platformer, but also share what you
          have created with the community at large FOR FREE INSTANTLY! You will be able to filter
          through the levels by their difficulty, a funness score, and also by their name. To check
          out the levels created by people like you, try out
{" "}
          <a href="http://localhost:4000/repository/">Levels Repository</a>
!
        </li>

        <li>
          User Profile: To utilize Platformer is to have fun. Therefore, you can simply log in via
          your Google Account and start to create or play different levels of the Platformer. You
          can also check out how many levels you have created thus far in our system in addition to
          how many you have won! Feel free to customize your name as well!
{" "}
          <a href="/">Get started today</a>

          <h1>What do you get out of the Platformer?</h1>

          <div>
            <h2>Before</h2>
              <img src="https://c.tenor.com/SnustcCENp4AAAAC/spongebob-squarepants-sad.gif" alt="Sad Spongebob" />
            <h2>After</h2>
            <img src="https://i0.wp.com/media1.giphy.com/media/3IP8R5HQch7Rm/giphy.gif?zoom=2" alt="Happy Spongebob" />

          </div>
        </li>
      </ul>
    </div>
  );
};

export default About;
