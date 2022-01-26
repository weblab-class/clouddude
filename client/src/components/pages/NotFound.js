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
      <div className="NotFound-wrapper">
        <h1 className="main-error">404 Not Found</h1>
        <p className="err-message">The page you requested couldn't be found.</p>
      </div>
    </div>
  );
};

export default NotFound;
