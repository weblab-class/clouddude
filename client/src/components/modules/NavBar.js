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
import HelpItem from "./HelpItem";

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
  name,
  setName,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const [newName, setNewName] = useState("");
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
      setName(user.name);
    });
    setNewName("");
  };

  // useEffect(() => {
  //   get("/api/whoami").then((user) => {
  //     if (user._id) {
  //       setName(name);
  //       setLevelsWon(user.levelsWon);
  //       setPublishedLevels(user.levelsPublished);
  //       setLevelsPlayed(user.levelsPlayed);
  //     }
  //   });
  // }, [userId]);

  return (
    <div id="document-page">
      <nav className="NavBar-container">
        <div className="NavBar-linkContainer u-inlineBlock">
          <ReactTooltip type="success" />
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

        <Modal
          className="modal"
          show={showPlatformHelp}
          onHide={handlePlatformHelpClose}
          size="lg"
          centered
        >
          <Modal.Header className="modalHeader">
            <Modal.Title className="h2">Exploring the Cloudverse</Modal.Title>
            <div className="modalSectionBody">
              The level repository is the gateway to the Cloudverse, opening the door to a vast
              repository of levels created and shared by other users, just like you! Through it, you
              can help CloudDude navigate through a limitless supply of unique and imaginative
              worlds, filtering by user-voted metrics such as level difficulty and funness. In
              short, the Cloudverse is a gateway to unlimited fun possibilities!
            </div>
          </Modal.Header>
          <Modal.Body className="modalContainer">
            <div className="modalSectionContainer">
              <div className="modalSectionTitle u-bold h4">Controls:</div>
              <div className="modalSectionBody">
                {" "}
                When exploring the Cloudverse, CloudDude's main objective is to get to the exit
                door. Along the way, he'll face a variety of friends and foes, all with their own
                unique characteristics. To help CloudDude navigate this universe of infinite
                possibilities, remember the following controls:
              </div>
            </div>
            <div className="modalSectionContainer">
              <div id="obstacleTitle" className="modalSectionTitle u-bold h4">
                Level Obstacles:
              </div>
              <div className="modalSectionBody">
                <div className="modalObstacleRow">
                  <HelpItem
                    name="Delete"
                    description="Removes previously placed obstacles"
                    image="https://i.imgur.com/sX8VgWy.png"
                  />
                  <HelpItem
                    name="Start"
                    description="Where the adventure begins"
                    image="https://i.imgur.com/lfAyDl6.png"
                  />
                  <HelpItem
                    name="Exit"
                    description="CloudDude's only goal"
                    image="https://i.imgur.com/tTmmxis.png"
                  />
                </div>
                <div className="modalObstacleRow">
                  <HelpItem
                    name="Platform"
                    description="Basic platform for standing"
                    image="https://dl.dropboxusercontent.com/s/8430hxmrkdolsuo/grass.png?dl=0"
                  />
                  <HelpItem
                    name="Falling Platform"
                    description="Collapses when touched"
                    image="https://i.imgur.com/jh2X6dc.png"
                  />
                  <HelpItem
                    name="Spike"
                    description="Dangerous spikey thing"
                    image="https://dl.dropboxusercontent.com/s/7a8tzts1xzvl4v3/spikes.png?dl=0"
                  />
                </div>
                <div className="modalObstacleRow">
                  <HelpItem
                    name="Coin"
                    description="Shiny spinning collectable"
                    image="https://i.imgur.com/eTNmgCf.png"
                  />
                  <HelpItem
                    name="Lock"
                    description="Collect all keys to remove"
                    image="https://www.dl.dropboxusercontent.com/s/hchmqqeq35o0hlk/lock.png?dl=0"
                  />
                  <HelpItem
                    name="Key"
                    description="Unlocks locked things"
                    image="https://www.dl.dropboxusercontent.com/s/a9t5307kthiyhli/smallKey.png?dl=0"
                  />
                </div>
                <div className="modalObstacleRow">
                  <HelpItem
                    name="Spinner"
                    description="Spinny spikey thing that moves"
                    image="https://i.imgur.com/sUdhdbm.png"
                  />
                  <HelpItem
                    name="Fire Worm"
                    description="Worm that spits fire"
                    image="https://www.dl.dropboxusercontent.com/s/3p3ksj2qncpvn85/singleWorm.png?dl=0"
                  />
                  <HelpItem
                    name="Spider"
                    description="Walking spider of doom"
                    image="https://i.imgur.com/6vm977B.png"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="modalButton" variant="primary" onClick={handleEditorHelpClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          className="modal"
          show={showEditorHelp}
          onHide={handleEditorHelpClose}
          size="lg"
          centered
        >
          <Modal.Header className="modalHeader">
            <Modal.Title className="h2">Expanding the Cloudverse</Modal.Title>
            <div className="modalSectionBody">
              The level designer puts the power in your hands to expand the Cloudverse in whatever
              way you see fit! Using a simple UI, instant level playback, and Google account
              integration, it couldn't be easier to bring the levels you picture in your mind into
              reality! Submitted levels are instantly available on the repository, providing a
              simple way to share your creations with the world! With numerous unique level
              obstacles and customizations at your disposal, the only limit is your imagination!
            </div>
          </Modal.Header>
          <Modal.Body className="modalContainer">
            <div className="modalSectionContainer">
              <div className="modalSectionTitle u-bold h4">Controls:</div>
              <div className="modalSectionBody">
                {" "}
                To get started, simply select one of the many obstacles from the left sidebar and
                add it to the scene by dragging or clicking across the grid. CloudDude's world will
                update automatically, allowing you to control CloudDude in your new creation using
                the same controls as any other level in the Cloudverse. The level can then be
                modified in real-time, giving you truly limitless control. Once finished, just add a
                name and description for your creation and click save to make your creation
                instantly available to other players worldwide!
              </div>
            </div>
            <div className="modalSectionContainer">
              <div id="obstacleTitle" className="modalSectionTitle u-bold h4">
                Level Obstacles:
              </div>
              <div className="modalSectionBody">
                <div className="modalObstacleRow">
                  <HelpItem
                    name="Delete"
                    description="Removes previously placed obstacles"
                    image="https://i.imgur.com/sX8VgWy.png"
                  />
                  <HelpItem
                    name="Start"
                    description="Where the adventure begins"
                    image="https://i.imgur.com/lfAyDl6.png"
                  />
                  <HelpItem
                    name="Exit"
                    description="CloudDude's only goal"
                    image="https://i.imgur.com/tTmmxis.png"
                  />
                </div>
                <div className="modalObstacleRow">
                  <HelpItem
                    name="Platform"
                    description="Basic platform for standing"
                    image="https://dl.dropboxusercontent.com/s/8430hxmrkdolsuo/grass.png?dl=0"
                  />
                  <HelpItem
                    name="Falling Platform"
                    description="Collapses when touched"
                    image="https://i.imgur.com/jh2X6dc.png"
                  />
                  <HelpItem
                    name="Spike"
                    description="Dangerous spikey thing"
                    image="https://dl.dropboxusercontent.com/s/7a8tzts1xzvl4v3/spikes.png?dl=0"
                  />
                </div>
                <div className="modalObstacleRow">
                  <HelpItem
                    name="Coin"
                    description="Shiny spinning collectable"
                    image="https://i.imgur.com/eTNmgCf.png"
                  />
                  <HelpItem
                    name="Lock"
                    description="Collect all keys to remove"
                    image="https://www.dl.dropboxusercontent.com/s/hchmqqeq35o0hlk/lock.png?dl=0"
                  />
                  <HelpItem
                    name="Key"
                    description="Unlocks locked things"
                    image="https://www.dl.dropboxusercontent.com/s/a9t5307kthiyhli/smallKey.png?dl=0"
                  />
                </div>
                <div className="modalObstacleRow">
                  <HelpItem
                    name="Spinner"
                    description="Spinny spikey thing that moves"
                    image="https://i.imgur.com/sUdhdbm.png"
                  />
                  <HelpItem
                    name="Fire Worm"
                    description="Worm that spits fire"
                    image="https://www.dl.dropboxusercontent.com/s/3p3ksj2qncpvn85/singleWorm.png?dl=0"
                  />
                  <HelpItem
                    name="Spider"
                    description="Walking spider of doom"
                    image="https://i.imgur.com/6vm977B.png"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="modalButton" variant="primary" onClick={handleEditorHelpClose}>
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
                }
                if (location.pathname === "/play/") {
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
                    {name}
                    's Profile
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Control
                        onChange={(event) => setNewName(event.target.value)}
                        type="text"
                        placeholder="Edit Name Here"
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
