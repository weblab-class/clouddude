import React from "react";
import { Link } from "@reach/router";

import "./HomeNavBar.css";

/**
 * The navigation bar at the top of the Home page.
 */
const HomeNavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Platformer</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/about/" className="NavBar-link">
          About
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavBar;
