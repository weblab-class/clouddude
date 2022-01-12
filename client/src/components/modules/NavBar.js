import React, { useState } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages.
 */

const GOOGLE_CLIENT_ID = "31388373258-ev9tadag8nhjb35r6pv3v1jfq7n7qrtg.apps.googleusercontent.com";

const NavBar = ({
  handleLogin, handleLogout, userId
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link to="/repository/" className="NavBar-link">
          Play
        </Link>
        <Link to="/leveleditor/" className="NavBar-link">
          Design
        </Link>
      </div>
      <div className="u-inlineBlock NavBar-login">
        {userId ? (
          <div>
            <IconButton
              edge="end"
              aria-label="urrent user"
              aria-haspopup="true"
              onClick={() => setMenuOpen(true)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>{userId.slice(0, 5)}</p>
            <div>
              <Menu open={menuOpen} keepMounted>
                <MenuItem onClick={() => setMenuOpen(false)}>Profile/Close</MenuItem>
                <MenuItem onClick={() => setMenuOpen(false)}>
                  <GoogleLogout
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={handleLogout}
                    onFailure={(err) => console.log(err)}
                  />
                </MenuItem>
              </Menu>
            </div>
          </div>
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
