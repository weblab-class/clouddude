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
        Platformer is a web game where users can create levels with obstacles and platforms with the
        goal of going from point A and point B.
      </h2>

      <p>
        More information:
        <iframe
          title="About"
          src="https://docs.google.com/presentation/d/e/2PACX-1vRTklKL7wdhlCN0fGXl0sECtT06LYDGAHpwCXC82zHYSg99lFI8hA-_izlpzDNzi33ZY75DDn8sj80V/embed?start=true&loop=true&delayms=3000"
          frameBorder="0"
          width="960"
          height="569"
          allowFullScreen="true"
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
        />
      </p>
    </div>
  );
};

export default About;
