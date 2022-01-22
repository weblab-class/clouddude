import React from "react";
import { Helmet } from "react-helmet";
import "./NotFound.css";

const NotFound = () => {
  document.body.style.overflow = "hidden";
  return (
    <div className="NotFound-container">
      <Helmet>
        <title>404 Error</title>
      </Helmet>
      <center>
        <h1>404 Not Found</h1>
        <p>The page you requested couldn't be found.</p>
      </center>
    </div>
  );
};

export default NotFound;
