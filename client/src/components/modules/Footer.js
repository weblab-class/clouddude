import React from "react";
import { Location } from "@reach/router";

import "../../utilities.css";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <center>
        <Location>
          {({ location }) => {
            if (location.pathname !== "/leveleditor/") {
              return (
                <>
                  &copy; 2022 CloudDude <br /> Designed in January 2022 by Ashar Farooq MIT'23,
                  Harry Heiberger MIT'24, Henry Heiberger MIT'24
                </>
              );
            } else {
              return (
                <>
                  <p className="Footer-expander" />
                </>
              );
            }
          }}
        </Location>
      </center>
    </div>
  );
};

export default Footer;
