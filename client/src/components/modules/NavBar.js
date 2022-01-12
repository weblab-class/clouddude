import React, { useState } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages.
 */

const GOOGLE_CLIENT_ID = "31388373258-ev9tadag8nhjb35r6pv3v1jfq7n7qrtg.apps.googleusercontent.com";

const NavBar = ({
  handleLogin, handleLogout, userId, publishedLevels, levelsWon, userName, setUserName
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const handleProfile = () => {
    setMenuOpen(false);
    setProfileModal(true);
  };

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
            <p>{userName}</p>
            <div>
              <Menu open={menuOpen} keepMounted>
                <MenuItem onClick={handleProfile}>My Profile</MenuItem>
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
            <div>
              <Modal show={profileModal} onHide={() => setProfileModal(false)}>
                <Modal.Header>
                  <Modal.Title>My Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onChange={(event) => setUserName(event.target.value)}
                        type="text"
                        placeholder="Edit Name"
                        value={userName}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="difficulty">
                      <Form.Label>
                        Published Levels:
                        {' '}
                        {publishedLevels}
                      </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="funness">
                      <Form.Label>
                        Levels Won:
                        {' '}
                        {levelsWon}
                      </Form.Label>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setProfileModal(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => setProfileModal(false)}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
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
