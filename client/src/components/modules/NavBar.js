import React, { useState, useEffect } from "react";
import { Link, Location } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTooltip from "react-tooltip";
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
  invalidAlert,
  setInvalidAlert,
  image,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [userName, setUserName] = useState("");
  const [showPlatformHelp, setShowPlatformHelp] = useState(false);
  const [showEditorHelp, setShowEditorHelp] = useState(false);
  const handlePlatformHelpClose = () => setShowPlatformHelp(false);
  const handlePlatformHelpShow = () => setShowPlatformHelp(true);
  const handleEditorHelpClose = () => setShowEditorHelp(false);
  const handleEditorHelpShow = () => setShowEditorHelp(true);

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

  // setInterval(() => {
  //   if (userId) {
  //     const body = { _id: userId };
  //     get("/api/user", body).then((user) => {
  //       console.log("user from frontend", user);
  //       if (user._id) {
  //         console.log("user from frontend inner", user[0]);
  //         setUserName(user.name);
  //         setNewName(user.name);
  //         setLevelsWon(user.levelsWon);
  //         setPublishedLevels(user.levelsPublished);
  //         setLevelsPlayed(user.levelsPlayed);
  //       }
  //     });
  //   }
  // }, 5000);
  return (
    <div id="document-page">
      <nav className="NavBar-container">
        <div className="NavBar-linkContainer u-inlineBlock">
          <ReactTooltip type="success" />
          <Link data-tip="CloudDude" to="/" className="NavBar-link">
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

        <Modal show={invalidAlert}>
          <Modal.Header>
            <Modal.Title>
              <div className="invalid">Invalid Username</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your username already exists! Please log in with a different account.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setInvalidAlert(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showPlatformHelp} onHide={handlePlatformHelpClose} size="lg" centered>
          <Modal.Header>
            <Modal.Title>Exploring the Cloudverse</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handlePlatformHelpClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditorHelp} onHide={handleEditorHelpClose} size="lg" centered>
          <Modal.Header>
            <Modal.Title>Expanding the Cloudverse</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleEditorHelpClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {userId ? (
          <div className="login">
            <Location>
              {({ location }) => {
                if (location.pathname === "/leveleditor/") {
                  return (
                    <img
                      src="https://i.imgur.com/ttgVSoN.png"
                      width="37"
                      height="37"
                      className="NavBar-helpButton"
                      onClick={handleEditorHelpShow}
                    />
                  );
                } else if (location.pathname === "/play/") {
                  return (
                    <img
                      src="https://i.imgur.com/ttgVSoN.png"
                      width="37"
                      height="37"
                      className="NavBar-helpButton"
                      onClick={handlePlatformHelpShow}
                    />
                  );
                }
              }}
            </Location>
            <IconButton
              edge="end"
              aria-label="current user"
              aria-haspopup="true"
              onClick={iconClick}
              color="inherit"
            >
              <img
                className="img-profile"
                src={localStorage.getItem("imageurl")}
                alt="profile-avatar"
                height="37"
                width="37"
              />
            </IconButton>
            <div>
              <Menu className="NavBar-profileMenu" anchorEl={anchorEl} open={menuOpen} keepMounted>
                <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                <MenuItem onClick={() => setMenuOpen(false)}>
                  <div className="google-button">
                    <GoogleLogout
                      clientId={GOOGLE_CLIENT_ID}
                      buttonText="Logout"
                      onLogoutSuccess={handleLogout}
                      onFailure={(err) => console.log(err)}
                    />
                  </div>
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
                      <Form.Label>
                        <b>Published Levels:</b> {publishedLevels}
                      </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="funness">
                      <Form.Label>
                        <b>Levels Won:</b> {levelsWon}
                      </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="funness">
                      <Form.Label>
                        <b>Levels Played:</b> {levelsPlayed}
                      </Form.Label>
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
            <Location>
              {({ location }) => {
                if (location.pathname === "/play/") {
                  return (
                    <img
                      src="https://i.imgur.com/ttgVSoN.png"
                      width="40"
                      height="40"
                      className="NavBar-helpButton"
                      onClick={handlePlatformHelpShow}
                    />
                  );
                }
              }}
            </Location>
            <div className="google-button">
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={handleLogin}
                onFailure={(err) => console.log(err)}
              />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
