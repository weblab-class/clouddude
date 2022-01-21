import React from "react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  document.body.style.overflow = "hidden";
  return (
    <div>
      <Helmet>
        <title>404 Error</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <p>The page you requested couldn't be found.</p>
    </div>
  );
};

export default NotFound;
