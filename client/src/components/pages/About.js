import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "../../utilities.css";
import "./About.css";

const About = () => {
  document.body.style.overflow = "auto";

  return (
    <div className="About-container">
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className="About-header">
        <h2 className="About-heading">
          The Cloudverse is shrinking and only CloudDude can fix it!
        </h2>
        <h3 className="About-subheading">
          Help CloudDude explore the ever-expanding Cloudverse through a vast collection of
          user-created levels or harness your imagination to create your own levels to help him
          expand it.
        </h3>
      </div>
      <div className="About-content">
        <h3 className="About-heading">How to CloudDude?</h3>

        <ul>
          <li>
            <span className="u-bold About-listItem">Explore the Cloudverse</span>: The level
            repository is the gateway to the Cloudverse, opening the door to a vast repository of
            levels created and shared by other users, just like you! Through it, you can help
            CloudDude navigate through a limitless supply of unique and imaginative worlds,
            filtering by user-voted metrics such as level difficulty and funness. In short, the
            Cloudverse is a gateway to unlimited fun possibilities
          </li>
          <li>
            <span className="u-bold About-listItem">Expand the Cloudverse</span>: The level designer
            puts the power in your hands to expand the Cloudverse in whatever way you see fit! Using
            a simple UI, instant level playback, and Google account integration, it couldn't be
            easier to bring the levels you picture in your mind into reality! Submitted levels are
            instantly available on the repository, providing a simple way to share your creations
            with the world! With numerous unique level obstacles and customizations at your
            disposal, the only limit is your imagination!
          </li>
        </ul>
      </div>
      <div className="About-why">
        <h3 className="About-heading">Why CloudDude?</h3>
        <div className="About-list">
          <span>
            <span className="">
              <strong>Imagination</strong>
            </span>{" "}
            |{" "}
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
        </div>
      </div>
      <div className="About-image"></div>
    </div>
  );
};

export default About;
