import React, { useState, useEffect } from "react";
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
import { post, get } from "../../utilities";

/**
 * The navigation bar at the top of all pages.
 */

const GOOGLE_CLIENT_ID = "31388373258-ev9tadag8nhjb35r6pv3v1jfq7n7qrtg.apps.googleusercontent.com";

const NavBar = ({
  handleLogin,
  handleLogout,
  userId,
  publishedLevels,
  setPublishedLevels,
  levelsWon,
  setLevelsWon,
  levelsPlayed,
  setLevelsPlayed,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [userName, setUserName] = useState("");

  const handleProfile = () => {
    setMenuOpen(false);
    setProfileModal(true);
  };

  document.addEventListener("click", (event) => {
    const clickElement = document.getElementById("document-page");
    let targetElement = event.target;

    do {
      if (targetElement === clickElement) {
        return;
      }
      targetElement = targetElement.parentNode;
    } while (targetElement);

    setMenuOpen(false);
  });

  const iconClick = (event) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleSubmit = () => {
    setProfileModal(false);
    const body = { user: { name: newName, _id: userId } };
    post("/api/user", body).then((user) => {
      setUserName(user.name);
    });
  };

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserName(user.name);
        setNewName(user.name);
        setLevelsWon(user.levelsWon);
        setPublishedLevels(user.levelsPublished);
        setLevelsPlayed(user.levelsPlayed);
      }
    });
  }, [userId]);

  return (
    <div id="document-page">
      <nav className="NavBar-container">
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            <img src="https://i.imgur.com/XTd5pLu.png" width="40" height="40" alt="Platformer" />
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
        {userId ? (
          <div className="login">
            <IconButton
              edge="end"
              aria-label="current user"
              aria-haspopup="true"
              onClick={iconClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <div>
              <Menu anchorEl={anchorEl} open={menuOpen} keepMounted>
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
                  <Modal.Title>
                    {userName}
                    's Profile
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onChange={(event) => setNewName(event.target.value)}
                        type="text"
                        placeholder="Edit Name"
                        value={newName}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="difficulty">
                      <Form.Label>Published Levels: {publishedLevels}</Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="funness">
                      <Form.Label>Levels Won: {levelsWon}</Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="funness">
                      <Form.Label>Levels Played: {levelsPlayed}</Form.Label>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setProfileModal(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        ) : (
          <div className="login">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={handleLogin}
              onFailure={(err) => console.log(err)}
            />
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
