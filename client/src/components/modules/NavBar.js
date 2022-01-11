import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages.
 */

const GOOGLE_CLIENT_ID = "31388373258-ev9tadag8nhjb35r6pv3v1jfq7n7qrtg.apps.googleusercontent.com";

const NavBar = ({ handleLogin, handleLogout, userId }) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/68/Cliff_2D_Game_Platformer_Ground_Game_Asset.png"
            width="50"
            height="40"
            alt="Platformer"
          />
        </Link>
        <Link to="/about/" className="NavBar-link">
          About
        </Link>
        <Link to="/play/" className="NavBar-link">
          Play
        </Link>
        <Link to="/leveleditor/" className="NavBar-link">
          Design
        </Link>
      </div>
      <div className="u-inlineBlock NavBar-login">
        {userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
