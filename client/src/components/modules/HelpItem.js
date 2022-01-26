import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./HelpItem.css";

const HelpItem = ({ name, image, description }) => {
  return (
    <div className="helpItemContainer">
      <img className="helpItemImage" src={image} alt={name} />
      <div className="helpItemInfoContainer">
        <div className="helpItemInfoTitle u-bold">{name}</div>
        <div className="helpItemInfoBody">{description}</div>
      </div>
    </div>
  );
};

export default HelpItem;
