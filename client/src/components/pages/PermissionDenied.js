import React from "react";
import { Helmet } from "react-helmet";

import "./PermissionDenied.css";

const PermissionDenied = () => {
  return (
    <div className="main-container">
      <Helmet>
        <title>Sign In Required</title>
      </Helmet>
      <h1 className="main-error">Sign-In Required</h1>
      <p className="err-message">Please Sign In to design a level!</p>
    </div>
  );
};

export default PermissionDenied;
