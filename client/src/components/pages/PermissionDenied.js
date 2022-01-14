import React from "react";
import { Helmet } from "react-helmet";

import "./PermissionDenied.css";

const PermissionDenied = () => {
  return (
    <div>
      <Helmet>
        <title>Sign In Required</title>
      </Helmet>
      <h1>Sign-In Required</h1>
      <p>Please sign in to design a level!</p>
    </div>
  );
};

export default PermissionDenied;
